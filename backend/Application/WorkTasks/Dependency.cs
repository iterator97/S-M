
using Application.Core;
using MediatR;
using Persistence;
using Domain;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Dto;
using Microsoft.EntityFrameworkCore;

namespace Application.WorkTasks
{
    public class Dependency
    {
        public class Command : IRequest<Result<Unit>>
        {
            public EditWorkTaskDto workTask { get; set; }

        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                var workTaskToEdit = await _context.WorkTasks.FindAsync(new Guid(request.workTask.previousId));

                if (workTaskToEdit == null)
                {
                    return Result<Unit>.Failure("Failed to find work task");
                }

                if (request.workTask.Content != workTaskToEdit.Content)
                {
                    workTaskToEdit.Content = request.workTask.Content;
                }

                if (request.workTask.SubContent != workTaskToEdit.SubContent)
                {
                    workTaskToEdit.SubContent = request.workTask.SubContent;
                }

                // Sprawdzam czy wszystkie zależne zadania zostały zakończone (Status done)
                var actualWorkTaskDependencyList = await _context.WorkTaskDependencies.Where(x => x.WorkTaskId.ToString() == request.workTask.previousId).ToListAsync();

                if ((int)request.workTask.Status == (int)Status.Done)
                {
                    if (actualWorkTaskDependencyList != null)
                    {
                        foreach (var item in actualWorkTaskDependencyList)
                        {
                            if (item != null)
                            {
                                var workTaskToCheck = await _context.WorkTasks.FindAsync(item.WorkTaskId);
                                if (workTaskToCheck != null)
                                {
                                    if (workTaskToCheck.Status != Status.Done)
                                    {
                                        return Result<Unit>.Failure("Nie można zakończyć zadania z powodu tego, że zadanie" + workTaskToCheck.Content + "NIe jest ukończone");
                                    }
                                }
                            }
                        }

                    }
                }

                // Edycja zadań zależnych (Status różny od Done)
                if (request.workTask.WorkTaskDependencyList.Count() > 0 && (int)request.workTask.Status != (int)Status.Done)
                {
                    foreach (var item in actualWorkTaskDependencyList)
                    {
                        _context.Remove(item);
                    }

                    foreach (var item in request.workTask.WorkTaskDependencyList)
                    {
                        var dependencyToCheck = await _context.WorkTaskDependencies.Where(x => x.WorkTaskId.ToString() == item).ToListAsync();

                        foreach (var el in dependencyToCheck)
                        {
                            if (el.WorkTaskDependencyId == request.workTask.previousId)
                            {
                                return Result<Unit>.Failure("Nie można dodać zależności ponieważ jest zależne od elementu" + el.WorkTaskDependencyId);
                            }
                            WorkTaskDependency newDep = new WorkTaskDependency()
                            {
                                WorkTaskId = new Guid(request.workTask.previousId),
                                WorkTaskDependencyId = el.Id.ToString(),
                            };
                            _context.WorkTaskDependencies.Add(newDep);
                        }
                    }

                }

                if ((int)request.workTask.Status != (int)Status.Done)
                {
                    workTaskToEdit.Status = (Status)request.workTask.Status;
                }

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update work task");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}

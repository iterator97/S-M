using Application.Core;
using Application.DTO;
using AutoMapper;
using MediatR;
using Persistence;


namespace Application.WorkTasks
{
    public class EditTask
    {
        public class Command : IRequest<Result<Unit>>
        {
            public EditWorkTaskDto workTask { get; set; }
        }

        public class Handler : IRequest<Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var workTaskToEdit = await _context.WorkTasks.FindAsync(request.workTask.previousId);

                //if (workTaskToEdit != null)
                //{
                //    return Result<Unit>.Failure("Failed to find work task");
                //}

                //if (request.workTask.Content != workTaskToEdit.Content)
                //{
                //    workTaskToEdit.Content = request.workTask.Content;
                //}

                //if (request.workTask.SubContent != workTaskToEdit.SubContent)
                //{
                //    workTaskToEdit.SubContent = request.workTask.SubContent;
                //}

                //var actualWorkTaskDependencyList = await _context.WorkTaskDependencies.Where(x => x.WorkTaskId.ToString() == request.workTask.previousId).ToListAsync();

                //if ((int)request.workTask.Status == (int)Status.Done && actualWorkTaskDependencyList.Count() == request.workTask.WorkTaskDependencyList.Count())
                //{
                //    foreach (var item in request.workTask.WorkTaskDependencyList)
                //    {
                //        var dependencyToCheck = await _context.WorkTaskDependencies.FindAsync(item);
                //        if (dependencyToCheck != null)
                //        {
                //            var workTaskToCheck = await _context.WorkTasks.FindAsync(dependencyToCheck.WorkTaskId);
                //            if (workTaskToCheck != null)
                //            {
                //                if (workTaskToCheck.Status == Status.Done)
                //                {
                //                    return Result<Unit>.Failure("Nie można zakończyć zadania z powodu tego, że zadanie" + workTaskToCheck.Content + "NIe jest ukończone");
                //                }
                //            }
                //        }
                //    }
                //}

                //if (actualWorkTaskDependencyList.Count() != request.workTask.WorkTaskDependencyList.Count())
                //{
                //    foreach (var item in request.workTask.WorkTaskDependencyList)
                //    {
                //        var dependencyToCheck = await _context.WorkTaskDependencies.FindAsync(item);
                //        if (dependencyToCheck != null)
                //        {
                //            var workTaskToCheck = await _context.WorkTasks.FindAsync(dependencyToCheck.WorkTaskId);
                //            if (workTaskToCheck != null)
                //            {
                //                var dependenciesToCheck = await _context.WorkTaskDependencies.Where(x => x.WorkTaskId.ToString() == workTaskToCheck.Id.ToString()).ToListAsync();

                //                foreach (var dep in dependenciesToCheck)
                //                {
                //                    if (dep.DependencyId.ToString() == request.workTask.previousId)
                //                    {
                //                        return Result<Unit>.Failure("Nie dodać zależności" + workTaskToCheck.Content + "ponieważ jest zależne od aktualne zadania");
                //                    }
                //                }
                //            }

                //        }
                //    }
                //}

                //if ((int)request.workTask.Status != (int)Status.Done)
                //{
                //    workTaskToEdit.Status = (Status)request.workTask.Status;
                //}

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update work task");

                return Result<Unit>.Success(Unit.Value);
            }

        }
    }
}

<?php

namespace App\Providers;

use App\Models\Board;
use App\Models\Status;
use App\Models\Task;
use App\Models\Subtask;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'boards' => fn() => Auth::check()
                ? Auth::user()
                ->boards()
                ->get(['id', 'name'])
                : [],
        ]);

        $authorizeBoard = function (User $user, Board $board) {
            $authorized = $user->id === $board->user_id;
            return $authorized
                ? Response::allow()
                : Response::deny('You do not own this board');
        };

        $authorizeStatus = function (User $user, Status $status) {
            $authorized = $user->id ===  $status->board->user_id;
            return $authorized
                ? Response::allow()
                : Response::deny('You do not own this status');
        };

        $authorizeTask = function (User $user, Task $task) {
            $authorized = $user->id  === $task->status->board->user_id;
            return $authorized
                ? Response::allow()
                : Response::deny('You do not own this task');
        };

        $authorizeSubtask = function (User $user, Subtask $subtask) {
            $authorized = $user->id  === $subtask->task->status->board->user_id;
            return $authorized
                ? Response::allow()
                : Response::deny('You do not own this subtask');
        };

        Gate::define('get-board', $authorizeBoard);
        Gate::define('update-board', $authorizeBoard);
        Gate::define('delete-board', $authorizeBoard);

        Gate::define('update-status', $authorizeStatus);

        Gate::define('update-task', $authorizeTask);
        Gate::define('delete-task', $authorizeTask);

        Gate::define('update-subtask', $authorizeSubtask);
    }
}

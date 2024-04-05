@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8 mt-4">
                <div class="card">
                    <div class="card-header">{{ __('Dashboard') }}</div>

                    <div class="card-body">
                        @if (session('status'))
                            <div class="alert alert-success" role="alert">
                                {{ session('status') }}
                            </div>
                        @endif

                        <h1>Logged user: {{ Auth::user()->name }}</h1>
                        <h2>Email: {{ Auth::user()->email }}</h2>ì
                        <h3>Your authentication level: {{Auth::user()->type_id}}</h3>
                        <form action="{{ route('profile.destroy', Auth::user()) }}" method="post">
                            @csrf
                            @method('delete')
                            <button class="btn btn-danger">Delete this record</button>
                        </form>
                        <a class="btn btn-info" href="{{ route('profile.edit', Auth::user()) }}">Edit this record</a>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
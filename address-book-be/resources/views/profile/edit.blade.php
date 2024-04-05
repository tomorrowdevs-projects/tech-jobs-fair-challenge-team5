@extends('layouts.admin')

@section('content')
    @include('partials.errors')
    <div class="container">
        <form action="{{route('profile.update', Auth::user())}}" method="POST">
            @csrf
            @method('PATCH')
            <h1 class="text-center">Edit your profile</h1>
            <div class="mb-3">
                <label class="form-label">
                    <h2>Name</h2>
                </label>
                <input type="text" class="form-control" name="name" value="{{ old('name', Auth::user()->name) }}">
            </div>
            <div class="mb-3">
                <label class="form-label">
                    <h2>E-mail</h2>
                </label>
                <input type="text" class="form-control" name="email" value="{{ old('email', Auth::user()->email) }}">
            </div>
            <div class="mb-3">
                <label class="form-label">
                    <h2>Authentication level</h2>
                </label>
                <input type="text" class="form-control" name="type_id" value="{{ old('type_id', Auth::user()->type_id) }}">
            </div>
            <button type="submit" class="btn btn-success">Submit</button>
        </form>
        <div>
            <a class="btn btn-secondary" href="{{ route('dashboard') }}">Go back to dashboard</a>
        </div>
    </div>
@endsection
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
                        <h2>Email: {{ Auth::user()->email }}</h2>
                        <h3>Your telephone number: {{Auth::user()->phone_number}}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@extends('layouts.master')
@section('title') Import guardians @endsection
@section('css')
@endsection
@section('content')
<div class="card">
    <div class="card-body">
        <div class="tab-pane fade active show" id="pills-payment" role="tabpanel" aria-labelledby="pills-payment-tab">
            <div>
                <h5 class="mb-1">Import guardians</h5>
                <p class="text-muted mb-4">Please add the identity number of your guaridan to import.</p>
            </div>

            @if(isset($status))
                @if($status === 'success')
                    <div class="alert alert-success" role="alert">
                        Guardian imported successfully!
                        <br>
                        Phone: {{ $data['user']['phone'] }}
                        <br>
                        Email: {{ $data['user']['email'] }}
                    </div>
                @elseif($status === 'error')
                    <div class="alert alert-danger" role="alert">
                        {{ $error }}
                    </div>
                @endif
            @endif

            <form action="{{route('guardians.import')}}" method="post">
                @csrf

                <div class="collapse show" id="paymentmethodCollapse" style="">
                    <div class="card p-4 border shadow-none mb-0 mt-4">
                        <div class="row gy-3">
                            <div class="col-md-12">
                                <label for="cc-name" class="form-label">Identity Number</label>
                                <input type="text" name="identity_number" class="form-control">
                                <small class="text-muted">Identity number as displayed on card</small>

                                @error('identity_number')
                                    <p class="mx-2 my-2 text-danger">
                                        <strong>
                                            {{$message}}
                                        </strong>
                                    </p>
                                @enderror
                            </div>
                        </div>
                    </div>
                </div>
        
                <div class="d-flex align-items-start gap-3 mt-4">
                    <button type="submit" class="btn btn-primary right ms-auto">Import Guardian</button>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection
@section('script')
<script src="{{ URL::asset('/assets/js/app.min.js') }}"></script>
@endsection
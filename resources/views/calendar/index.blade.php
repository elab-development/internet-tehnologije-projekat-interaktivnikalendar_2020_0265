<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Interaktivni Kalendar</title>
   
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.4.0/fullcalendar.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.4.0/fullcalendar.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
</head>

<body>
<!-- Button trigger modal , i ovo-->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button>

<!-- Modal skinuto sa bootstrapa-->

<div class="modal fade" id="DogadjaModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

<div class="modal-dialog modal-dialog-centered"> 

    <div class="modal-content">
    
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Dogadjaj</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
      
        <input type="text" class ="form-control" id = "naziv">
        <span id= "nazivError" class= "text-danger"></span>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zatvori</button>
        <button type="button" id ="sacuvajBtn" class="btn btn-primary">Sacuvaj</button>

      </div>
    </div>
  </div>

</div>


    <div class="container">
        <div class="row">
            <div class="col-12">
                <h3 class="text-center mt-5">Interaktivni kalendar</h3>
                <div class="col-md-11 offset-1 mt-5 mb-5">

                    <div id="calendar">

                    </div>

                </div>
            </div>
        </div>
    </div>

<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></script>

    <script>
        
        $(document).ready(function () {

            $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

         var dogadjaji = @json($events); //nzm sto je ovo crveno, al radi

        //console.log(dogadjaji);
            $('#calendar').fullCalendar({
                
                header: {
                    left: 'prev, next today',
                    center: 'title',
                    right: 'month, agendaWeek, agendaDay'
                },
                monthNames: ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'],
                monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'],
                dayNames: ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'],
                dayNamesShort: ['Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub'],
                firstDay: 1,
                buttonText: {
                    today: 'danas',
                    day: 'dan',
                    month: 'mesec',
                    week: 'nedelja',
                    list: 'lista'
                },
                
                fixedWeekCount: false,
                
                events:dogadjaji,
                selectable:true,
                selectHelper: true,
                select: function(start, end, allDays){
                  //  console.log(start)

                $('#DogadjaModal').modal('toggle');
                    $('#sacuvajBtn').click(function() {

                    var naziv = $('#naziv').val();
                                                           // console.log(naziv)
                    var datum_pocetka = moment(start).format('YYYY-MM-DD'); 
                                                                  // console.log(datum_pocetka)
                    var datum_kraja= moment(end).format('YYYY-MM-DD'); 
                    //console.log(datum_kraja)
                       
                    
                    
                    $.ajax({
                            url:"{{ route('calendar.sacuvaj') }}",
                            type:"POST",
                            dataType:'json',
                            data:{ naziv, datum_pocetka, datum_kraja },

                            success:function(response){
                                $('#DogadjaModal').modal('hide')

                                $('#calendar').fullCalendar('renderEvent', {
                                    'title': response.naziv,
                                    'start' : response.datum_pocetka,
                                    'end'  : response.datum_kraja,
                                    
                                    
                                });
                             },

                           error:function(error){
                            
                                if(error.responseJSON.errors) {
                                    $('#nazivError').html(error.responseJSON.errors.naziv); 
                                }
                             },


                        });

                         });


                }
            })
            
        });

    </script>
</body>

</html>
class EventManager {

    constructor() {
        this.urlBase = "/events";
        this.obtenerDataInicial();
        this.inicializarFormulario();
        this.guardarEvento();
    }

    obtenerDataInicial() {
        let url = this.urlBase + "/all";
        $.get(url, (response) => {
            if (typeof(response) == "string") {
                window.location.href = '/';
            } else {
                this.inicializarCalendario(response);
            }
        });
    }
    actualizarEvento(evento) {
        let id = evento._id,
            start = moment(evento.start).format('YYYY-MM-DD HH:mm:ss'),
            end = moment(evento.end).format('YYYY-MM-DD HH:mm:ss'),
            title = evento.title,
            form_data = new FormData(),
            start_date,
            end_date,
            start_hour,
            end_hour
        start_date = start.substr(0, 10);
        end_date = end.substr(0, 10);
        start_hour = start.substr(11, 8);
        end_hour = end.substr(11, 8);
        form_data = new FormData(),
            form_data.append('id', id);
        form_data.append('start', start);
        form_data.append('end', end);
        form_data.append('start_hour', start_hour);
        form_data.append('end_hour', end_hour);
        let url = this.urlBase + "/update";
        $.ajax({
            url: url,
            type: "put",
            data: {
                id: id,
                start: start_date,
                title: title,
                end: end_date,
                start_hour: start_hour,
                end_hour: end_hour
            },
            success: (data) => {
                if (data.msg == "OK") {
                    alert('Se ha actualizado el evento exitosamente')
                } else {
                    alert(data.msg)
                }
            },
            error: function() {}
        })
    }
    eliminarEvento(evento) {
        let eventId = evento._id;
        let url = this.urlBase + '/delete/' + eventId
        $.post(url, {
            id: eventId
        }, (response) => {
            alert(parseInt(response.n) > 0 ? "Evento borrado..." : "Error al grabar");
        });
    }
    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault();
            let start = $('#start_date').val(),
                title = $('#titulo').val(),
                end = '',
                start_hour = '',
                end_hour = '';
            if (!$('#allDay').is(':checked')) {
                end = $('#end_date').val();
                start_hour = $('#start_hour').val();
                end_hour = $('#end_hour').val();
                if (start_hour !== "")
                    start = start + 'T' + start_hour;
                if (end_hour !== "")
                    end = end + 'T' + end_hour;
            }
            let url = this.urlBase + "/new";
            if (title != "" && start != "") {
                let ev = {
                    title: title,
                    start: start,
                    end: end
                };
                $.post(url, ev, (response) => {
                    this.inicializarFormulario();
                    ev._id = response.id;
                    $('.calendario').fullCalendar('renderEvent', ev);
                    alert(parseInt(response.total) > 0 ? "Registro grabado correctamente..." : "Error al grabar");
                });
            } else {
                alert("Complete los campos obligatorios para el evento");
            }
        });
    }
    inicializarFormulario() {
        console.log('inicializar formulario')
        $('#start_date, #titulo, #end_date, #start_hour, #end_hour').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function() {
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled");
            } else {
                $('.timepicker, #end_date').removeAttr("disabled");
            }
        });
    }
    inicializarCalendario(eventos) {
        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: '2020-08-18',
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
                this.actualizarEvento(event);
            },
            events: eventos,
            eventDragStart: (events, jsEvent) => {
                $('.delete').find('img').attr('src', "img/delete.png");
                $('.delete').css('background-color', '#a70f19');
            },
            eventDragStop: (events, jsEvent) => {
                $('.delete').find('img').attr('src', "img/delete.png");
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX <= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                    console.log(event._id, event.title)
                    this.eliminarEvento(events);
                    $('.calendario').fullCalendar('removeEvents', event._id);
                }
            }
        });
    }
}

const Manager = new EventManager();
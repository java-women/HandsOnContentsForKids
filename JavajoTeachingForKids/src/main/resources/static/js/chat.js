$(document).ready(function() {
    // defined a connection to a new socket endpoint
    var socket = new SockJS('/endpoint');

    var stompClient = Stomp.over(socket);

    stompClient.connect({ }, function(frame) {
        // subscribe to the /topic/message endpoint
        stompClient.subscribe("/topic/message", function(data) {
            var messages = JSON.parse(data.body);
            $("<tr>"
                + "<td>" + messages.date + "</td>"
                + "<td>" + messages.name + "</td>"
                + "<td>" + messages.message + "</td>"
                + "</tr>").prependTo("#messages");
        });
    });

    $("button#send").click(function () {
        var name = $('#name').val();
        var message = $('#message').val();
        if (name != "" && message != "") {
            stompClient.send('/topic/message', {}, JSON.stringify({"date": new Date().toLocaleString(), "name": name, "message": message}));
            $('#message').val('');
        }
    });
});

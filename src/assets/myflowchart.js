
console.log('prova');

$(document).ready(function() {
    $.ajax({
        url : "http://localhost:5000/flowchart/",
        dataType : "text",
        success : function(data) {
            var diagram = Diagram.parse(data);
            diagram.drawSVG("diagram", {theme: 'simple'});

        }
    });
});
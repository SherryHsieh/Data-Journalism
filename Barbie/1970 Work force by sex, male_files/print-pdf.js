require([], function() {

    console.log('print pdf');

    $(function() {

        var action = $('.chart-actions .action-export-print-pdf'),
            modal;

        $('a', action).click(function(e) {
            e.preventDefault();
            printAsPDF();
        });

        function printAsPDF() {
            // add print-specific css
            var frame = $('#iframe-vis').get(0),
                w = frame.clientWidth,
                h = frame.clientHeight,
                px2cm = 0.03,
                frame_doc = frame.contentDocument,
                frame_win = frame.contentWindow;

            // append print style
            $('style#print', frame_doc).remove();

            var style = document.createElement('style');
            style.id = 'print';
            frame_doc.head.appendChild(style);
            style.innerHTML = '\n@media print { body { padding: 20px; } } \n @page { size: ' + (w*px2cm)+'cm '+(h*px2cm)+'cm; '+
                'margin-left: 0px; margin-right: 0px; margin-top: 0px; margin-bottom: 0px; }\n';

            // print
            setTimeout(function() { frame_win.print(); }, 100);
        }

        var cssPagedMedia = (function () {
            var style = document.createElement('style');
            document.head.appendChild(style);
            return function (rule) {
                style.innerHTML = rule;
            };
        }());

        cssPagedMedia.size = function (size, margin) {
            cssPagedMedia('@page {size: ' + size + '; margin: '+margin+';}');
        };

        // function showModal() {
        //     $.get('/plugins/export-image/export-modal.twig', function(data) {
        //         modal = $('<div class="modal hide">' + data + '</div>').modal();
        //         $('.btn-export-chart', modal).click(exportAsImage);
        //         $('.btn-test', modal).click(testServer);
        //     });
        // }

    });

});

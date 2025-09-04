<script>
/* ============================
   FUNCIONES AUXILIARES
============================ */
function parseFloatHTML(element) {
    return parseFloat(element.textContent.replace(/[^\d.-]/g, '')) || 0;
}

function parsePrice(number) {
    return "$" + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* ============================
   ACTUALIZAR FACTURA
============================ */
function updateInvoice() {
    var total = 0;

    // recorrer filas de productos
    var rows = document.querySelectorAll('.products-table tbody tr');
    rows.forEach(function(row) {
        var cells = row.querySelectorAll('td');
        if (cells.length >= 4) {
            var qty = parseFloatHTML(cells[1]);
            var rate = parseFloatHTML(cells[2]);
            var amount = qty * rate;

            // mostrar monto en columna AMOUNT
            cells[3].textContent = amount ? parsePrice(amount) : "";
            total += amount;
        }
    });

    // actualizar SUBTOTAL y TOTAL
    var subtotalCell = document.querySelector('.totals-table tr:first-child td:last-child');
    var totalCell = document.querySelector('.totals-table tr:last-child td:last-child');

    if (subtotalCell) subtotalCell.textContent = parsePrice(total);
    if (totalCell) totalCell.textContent = parsePrice(total);
}

/* ============================
   EVENTOS
============================ */
document.addEventListener('input', function(e) {
    if (e.target.closest('.products-table')) {
        updateInvoice();
    }
});

// calcular al cargar la página
document.addEventListener('DOMContentLoaded', updateInvoice);
</script>

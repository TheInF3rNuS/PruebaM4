async function cambiarTodo(row, color, numPersonas) {
    console.log(`Iniciando carga de personajes: ${numPersonas}`);
    const startTime = performance.now();
    
    try {
        const promises = numPersonas.map(numPersona => {
            const url = `https://swapi.dev/api/people/${numPersona}`;
            console.log(`Realizando solicitud para el personaje ${numPersona} desde ${url}`);
            return fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "GET"
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud para el personaje ${numPersona}: ${response.statusText}`);
                }
                return response.json();
            });
        });

        const results = await Promise.all(promises);

        const endTime = performance.now();
        console.log(`Todas las solicitudes completadas en ${(endTime - startTime).toFixed(2)} ms`);

        results.forEach(result => {
            // Verifica si el personaje ya está en el DOM
            if ($(row).find(`.timeline-text:contains('${result.name}')`).length === 0) {
                console.log(`Añadiendo personaje ${result.name} al DOM`);
                $(row).append(
                    `<div class="col-12 col-md-6 col-lg-4 a">
                        <div class="single-timeline-content d-flex wow fadeInLeft 2021" data-wow-delay="0.3s"
                            style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
                            <div class="timeline-icon" style="background-color:${color}"><i class="fa fa-address-card" aria-hidden="true"></i>
                            </div>
                            <div class="timeline-text">
                                <h6>${result.name}</h6>
                                <p>Estatura: ${result.height} cm. Peso: ${result.mass} kg.</p>
                            </div>
                        </div>
                    </div>`
                );
            } else {
                console.log(`El personaje ${result.name} ya está en el DOM`);
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Uso modificado para pasar un array de personajes
$(function () {

    $('p:contains(1 - 5)').mouseenter(() => {
        cambiarTodo('.firstRow', 'salmon', [1, 2, 3, 4, 5]);
    });

    $('p:contains(6 - 10)').mouseenter(() => {
        cambiarTodo('.secondRow', 'lightgreen', [6, 7, 8, 9, 10]);
    });

    $('p:contains(11 - 15)').mouseenter(() => {
        cambiarTodo('.thirdRow', 'lightskyblue', [11, 12, 13, 14, 15]);
    });
});

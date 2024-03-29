$(document).ready(function () {
    const main = $('#main')
    const input = $('#superHeroInput');
    const form = $('#formBusqueda');
    const resultado = $('#resultado');
    let heroe = {};


    form.on('submit', function (e) {
        e.preventDefault();
        const numeroHeroe = parseInt(input.val().trim())
        if (numeroHeroe <= 0 || numeroHeroe > 731) {
            resultado.children().remove();
            heroe = {}
            inputInvalido()
        } else {
            inputValido()
            resultado.children().remove();
            getSuperHeroe(numeroHeroe);
            spinner();
            setTimeout(() => {
                console.log(heroe)
                imprimirHeroe(heroe);
            }, 3000);
        }
    })

    const getSuperHeroe = (numeroHeroe) => {
        $.ajax({
            url: `https://www.superheroapi.com/api.php/2550778278427780/${numeroHeroe}`,
            method: 'GET',
            success(response) {
                agregarHeroe(response);
            },
            err(e) {
                console.log(e)
            }
        })
    }
    const agregarHeroe = (response) => {
        heroe = {
            nombre: response.name,
            conexiones: response.connections['group-affiliation'],
            autor: response.biography.publisher,
            occupacion: response.work.occupation,
            primeraAparicion: response.biography['first-appearance'],
            altura: response.appearance.height,
            alianzas: response.biography.aliases,
            img: response.image.url,
            stats : response.powerstats
        }
    }

    const imprimirHeroe = (heroe) => {
        containerHero();

        resultado.removeClass('visually-hidden')
        imprimirDatos(heroe);
        imprimirGrafico(heroe);
    }

    const containerHero = () => {
        resultado.append(`<h2>SuperHero Encontrado</h2>
            <article class="card">
            <div class="d-flex">
            <div class="img-superheroe">
            </div>
            <div class="container">
            <div class="card-text mt-3" id="cabecera">
            </div>
            <div class="card-body">
            <ul class="list-group list-group-flush" id="lista">
            </ul>
            </div>
            </div>
            </div>
            </article>
            <article>
            <div id="chartContainer" style="height: 370px; width: 100%;"></div>
            </article>`)
    }

    const imprimirDatos = (heroe) =>{
        const img = $('.img-superheroe');
        const cabecera = $('#cabecera');
        const lista = $('#lista')
        Object.keys(heroe).forEach( llave =>{
            switch (llave) {
                case 'nombre':
                        cabecera.append(`<h3>Nombre: ${heroe[llave]}`)
                        break;
                    case 'conexiones':
                        cabecera.append(`<p>Conexiones: ${heroe[llave]}</p>`)
                        break;
                        case 'autor':
                            lista.append(`<li class="list-group-item"><i>Publicado por: </i>${heroe[llave]}</li>`)
                            break;
                            case 'occupacion':
                                lista.append(`<li class="list-group-item"><i>Ocupación: </i>${heroe[llave]}</li>`)
                        break;
                        case 'primeraAparicion':
                        lista.append(`<li class="list-group-item"><i>Primera Aparición: </i${heroe[llave]}</li>`)
                        break;
                        case 'altura':
                            lista.append(`<li class="list-group-item"><i>Altura: </i>${heroe[llave][0]} - ${heroe[llave][1]}</li>`)
                            break;
                        case 'alianzas':
                            lista.append(`<li class="list-group-item"><i>Alianzas: </i> ${heroe[llave]}</li>`)
                            break;
                        case 'img':
                            img.append(`<img src="${heroe[llave]}" alt="heroe">`)
                            break;
                        default:
                            console.log('ola')
                        }
        })
    }
    const imprimirGrafico = (heroe) =>{
        const grafico = $('#chartContainer')
        const statsKeys = Object.keys(heroe.stats);
        console.log(statsKeys)
        const options = {
            title: {
                text: `Estadisticas de Poder para ${heroe.nombre}`
            },
            animationEnabled: true,
            data: [{
                type: "pie",
                startAngle: 40,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: [
                    { y: heroe.stats.intelligence , label: statsKeys[0] },
                    { y: heroe.stats.strength     , label: statsKeys[1] },
                    { y: heroe.stats.speed        , label: statsKeys[2] },
                    { y: heroe.stats.durability   , label: statsKeys[3] },
                    { y: heroe.stats.power        , label: statsKeys[4] },
                    { y: heroe.stats.combat       , label: statsKeys[5] },
                ]
            }]
        };
        grafico.CanvasJSChart(options);
    }

    const spinner = () => {
        main.append(`<div class="spinner mb-5">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
        </div>`)
        setTimeout(() => {
            $('.spinner').remove();
        }, 3000);
    }


    const inputValido = () => {
        input.removeClass('is-valid is-invalid');
        input.addClass('is-valid');
    }
    const inputInvalido = () => {
        input.removeClass('is-valid is-invalid');
        input.addClass('is-invalid');
    }


})

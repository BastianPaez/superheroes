$(document).ready(function(){
    const input = $('#superHeroInput');
    const form = $('#formBusqueda');
    const resultado = $('#resultado');
    let heroe = {};
    // cambiar a la funcion
    const img = $('.img-superheroe');
    const cabecera = $('#cabecera');
    const lista = $('#lista')

    
    
    form.on('submit', function(e){
        e.preventDefault();
        const numeroHeroe = parseInt(input.val().trim())
        if (numeroHeroe > 0){
            input.removeClass('is-valid is-invalid')
            input.addClass('is-valid')
            imprimirHeroe(heroe);
        } else {
            input.removeClass('is-valid is-invalid')
            input.addClass('is-invalid')
            console.log('es numero bajo a 1')
        }
    })
    
    const getSuperHeroe = () => {
        $.ajax({
            url : `https://www.superheroapi.com/api.php/2550778278427780/213`,
            method : 'GET',
            success(response){
                agregarHeroe(response);
            },
            err(e){
                console.log(e)
            }
        })
    }
    const agregarHeroe = (response) =>{
        heroe = {
            nombre : response.name,
            conexiones : response.connections['group-affiliation'],
            autor : response.biography.publisher,
            occupacion : response.work.occupation,
            primeraAparicion : response.biography['first-appearance'],
            altura : response.appearance.height,
            alianzas : response.biography.aliases,
            img : 'https://www.superherodb.com/pictures2/portraits/10/100/835.jpg'
        }
        console.log(heroe)
    }
    
    const imprimirHeroe = (heroe) =>{
        // resultado.append(`<h2>SuperHero Encontrado</h2>`)
        // resultado.append(`<article class="card">
        //                     <div class="d-flex">
        //                         <div class="img-superheroe">
        //                             // aqui va img
        //                         </div>
        //                         <div class="container">
        //                             <div class="card-text mt-3" id="cabecera">
        //                                 // aqui va un h3 con el nombre
        //                                 // aqui va un p con conexiones
        //                         </div>
        //                             <div class="card-body">
        //                                 <ul class="list-group list-group-flush" id="lista">
        //                                     //aqui va un li con un <i publicado por:
        //                                     //aqui va un li con un <i ocupacion:
        //                                     //aqui va un li con un <i primera aparicion:
        //                                     //aqui va un li con un <i altura:
        //                                     //aqui va un li con un <i alianzas:
        //                                 </ul>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </article>`)

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
            }
        })
    }
    getSuperHeroe();

    
} )

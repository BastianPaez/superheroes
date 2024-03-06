$(document).ready(function(){
    const input = $('#superHeroInput');
    const form = $('#formBusqueda');
    const resultado = $('#resultado');
    let heroe = {};


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
        Object.keys(heroe).forEach( llave =>{
            switch (llave) {
                case 'nombre':
                    resultado.append(`<h2>${heroe[llave]}</h2>`)
                    break;
                case 'conexiones':
                    console.log(llave);
                    break;
                case 'autor':
                    console.log(llave);
                    break;
                case 'occupacion':
                    console.log(llave);
                    break;
                case 'primeraAparicion':
                    console.log(llave);
                    break;
                case 'altura':
                    console.log(llave);
                    break;
                case 'alianzas':
                    console.log(llave);
                    break;
                case 'img':
                    console.log(llave);
                    break;
            }
        })
    }
    getSuperHeroe();

    
} )

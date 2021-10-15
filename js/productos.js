class Productos {

    getProductos = async(limite,desde,busqueda="0",criterio = '',id_catego,id_sub_catego) => {

        let url = 'https://restserver-pastizeta.herokuapp.com/api';
        let respuesta;

        $('.items').html(`<div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Cargando...</span>
                            </div>
                          </div>`);

        if(busqueda == "0"){
             respuesta = await fetch(`${url}/productos/${id_catego}/${id_sub_catego}/?limite=${limite}&desde=${desde}`);
        }else{
             respuesta = await fetch(`${url}/buscar/productos/${criterio}/?limite=${limite}&desde=${desde}`);
        }
        

        if(respuesta.ok){
            const productos = await respuesta.json();
            let prod_array;
            let total_productos;
            
            if(busqueda == "0"){
                 prod_array = productos.productos; //esto es un array
                 total_productos = productos.total;
            }else{
                 prod_array = productos.results; //esto es un array
                 total_productos = productos.total;
            }
            

            //pintado de productos
            let html= '';
            let class_active = '';
            let paginas = total_productos/limite;
            paginas = Math.ceil(paginas);

            const row_prod = $('#row_prod');

            row_prod.html('');

            html = await this.pintaProductos(prod_array,paginas,limite,desde,busqueda,criterio,id_catego,id_sub_catego);
            $('.items').fadeIn(2000).html(html);
            row_prod.html(html);

        }else{
            let respErr = await respuesta.json();
            alert(respErr);
            return;
        }
        
    }
    
    pintaProductos = async(prod_array,paginas,limite,desde,busqueda,criterio = '') => {
        let html = '';

        prod_array.forEach( async(producto) => {

            let diponible = '';
            let cuenta_prod = 0;

            if(producto.disponible){
                diponible = '<i class="far fa-check-circle"></i> Disponible';
            }else{
                diponible = '<i class="far fa-times-circle"></i> No Disponible';
            } 
            
            if(producto.img == 'undefined' || producto.img == '' || producto.img == undefined){
                producto.img = 'https://res.cloudinary.com/api-pastizeta/image/upload/v1620943698/no-image_ccq42m.jpg';
            }
            
          
            html+= `<div class="col-lg-4 col-md-6 col-sm-6 col-xs-6 pt-3">
                <div class="card">
                    <img id="img_${producto._id}" src="${producto.img}" width="200" height="300" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5>${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="card-text precio">$${producto.precio}</p>
                        <p class="card-text">${diponible}</p>
                    </div>
                </div>
            </div>`;

           
        })



        html += `<nav class="my-4" aria-label="...">
                    <ul class="pagination pagination-lg justify-content-center">` +
                        await this.pintarPaginador(paginas,desde,limite,busqueda,criterio); +
                `	</ul>
                </nav>`
        
        return html;
    }

    pintarPaginador = async( paginas = 0 , desde , limite,busqueda,criterio ) =>{

        let htmlPaginador = '';
        let desde_x_pag = 0;
        let i=1;

        for( i=1 ; i <= paginas ; i++ ){
            let class_active = '';
            if( i == 1 ){
                class_active='active';
            }
            htmlPaginador += `<li class="page-item ${class_active}"><a id ="${i}" class="page-link" href="#" data="${i}" desde="${desde_x_pag}" busqueda="${busqueda}" criterio="${criterio}">${i}</a></li>`
            desde_x_pag = desde_x_pag + limite;
        } 

        return htmlPaginador;
    }
  }
/*
$(document).ready(async()=>{

    let limitexpagina = 6;
    let desde_art = 0;
    let respuesta;
    const url = 'https://restserver-pastizeta.herokuapp.com/api'
    //obtener todos los productos y pintarlos segun su categoria y subcategoria asignada
    const getProductos = async(limite,desde,busqueda="0",criterio = '') => {

        $('.items').html(`<div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Cargando...</span>
                            </div>
                          </div>`);

        if(busqueda == "0"){
             respuesta = await fetch(`${url}/productos/?limite=${limite}&desde=${desde}`);
        }else{
             respuesta = await fetch(`${url}/buscar/productos/${criterio}/?limite=${limite}&desde=${desde}`);
        }
        

        if(respuesta.ok){
            const productos = await respuesta.json();
            let prod_array;
            let total_productos;
            
            if(busqueda == "0"){
                 prod_array = productos.productos; //esto es un array
                 total_productos = productos.total;
            }else{
                 prod_array = productos.results; //esto es un array
                 total_productos = productos.total;
            }
            

            //pintado de productos
            let html= '';
            let class_active = '';
            let paginas = total_productos/limite;
            paginas = Math.ceil(paginas);

            const row_prod = $('#row_prod');

            row_prod.html('');

            html = await pintaProductos(prod_array,paginas,limite,desde,busqueda,criterio);
            $('.items').fadeIn(2000).html(html);
            //row_prod.html(html);

        }else{
            let respErr = await respuesta.json();
            alert(respErr);
            return;
        }
        
    }

    const pintaProductos = async(prod_array,paginas,limite,desde,busqueda,criterio = '') => {
        let html = '';

        prod_array.forEach( async(producto) => {

            let diponible = '';

            if(producto.disponible){
                diponible = '<i class="far fa-check-circle"></i> Disponible';
            }else{
                diponible = '<i class="far fa-times-circle"></i>> No Disponible';
            } 
            
            if(producto.img == 'undefined' || producto.img == '' || producto.img == undefined){
                producto.img = 'https://res.cloudinary.com/api-pastizeta/image/upload/v1620943698/no-image_ccq42m.jpg';
            }
            
            html+= `<div class="col-lg-4 col-md-6 col-xs-12 col-sm-12 pt-3">
                    <div class="card">
                        <img id="img_${producto._id}" src="${producto.img}" width="200" height="300" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5>${producto.nombre}</h5>
                            <p class="card-text">${producto.descripcion}</p>
                            <p class="card-text">$ ${producto.precio}</p>
                            <p class="card-text">$ ${diponible}</p>
                        </div>
                    </div>
                </div>`;
        })



        html += `<nav class="my-4" aria-label="...">
                    <ul class="pagination pagination-lg justify-content-center">` +
                        await pintarPaginador(paginas,desde,limite,busqueda,criterio); +
                `	</ul>
                </nav>`
        
        return html;
    }

    const pintarPaginador = async( paginas = 0 , desde , limite,busqueda,criterio ) =>{

        let htmlPaginador = '';
        let desde_x_pag = 0;

        for( i=1 ; i <= paginas ; i++ ){
            class_active = '';
            if( i == 1 ){
                class_active='active';
            }
            htmlPaginador += `<li class="page-item ${class_active}"><a id ="${i}" class="page-link" href="#" data="${i}" desde="${desde_x_pag}" busqueda="${busqueda}" criterio="${criterio}">${i}</a></li>`
            desde_x_pag = desde_x_pag + limite;
        } 

        return htmlPaginador;
    }

    $('#row_prod').on('click','.pagination li a', async function(){
        //$('.items').html('<div class="text-center"><div class="spinner-grow text-success m-5" role="status"><span class="sr-only">Cargando...</span></div></div>');

        let pagina = $(this).attr('data');
        let desde  = $(this).attr('desde');	
        let busqueda  = $(this).attr('busqueda');
        let criterio  = $(this).attr('criterio');

        await getProductos(limitexpagina,Number(desde),busqueda,criterio);
        
        //$('.items').fadeIn(2000).html(data);
        $('.pagination li').removeClass('active'); 
        $('.pagination li a[data="'+Number(pagina)+'"]').parent().addClass('active');

    }); 

    //buscar procuctos al cambiar el texto del inpunt
    $('#btnBP').on('click',function(){
					
        let valor_buscado = $('#textBusqueda').val();
        
        if(valor_buscado != ''){
            getProductos(limitexpagina,desde_art,"1",valor_buscado);
        }else{
            getProductos(limitexpagina,desde_art,"0",'');	
        }
        //alert(valor_buscado);
    })

    
});

*/
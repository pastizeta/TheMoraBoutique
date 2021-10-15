<?php

    $id_catego = $_REQUEST["id_categoria"];
    $id_sub_catego = $_REQUEST["id_sub_categoria"];
    $nom_categoria = $_REQUEST["nom_categoria"];
    $nom_sub_categoria = $_REQUEST["nom_sub_categoria"];

?>

<style type="text/css">
    .fa-times-circle{
        font-size:2rem;
        color: red;
    }

    .fa-check-circle{
        font-size:2rem;
        color: green;
    }
    .card-text{
        font-size: 1rem;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    .precio{
        font-size: 2rem;
        color: #E94CF8;
    }

    .breadcrumb-item{
        font-size: 2rem;
        color: #A70DB0;
    }

    @media (max-width: 1024px) {
        .breadcrumb-item{
            font-size: 1.5rem;
        }

    }

    @media (max-width: 600px) {
        .breadcrumb-item{
        font-size: 1rem;
    }
    }
    

</style>

<script>
    $(document).ready(async()=>{
        //const productos = await getProductos(limitexpagina,desde_art,"0");
        let limitexpagina = 25;
        let desde_art = 0;
        let id_catego = $('#id_catego').val();
        let id_sub_catego = $('#id_sub_catego').val();
        
        //alert(`categoria: ${id_catego} , subcategoria ${id_sub_catego}`);

        const objProd = new Productos();
        await objProd.getProductos(limitexpagina,desde_art,"0",'',id_catego,id_sub_catego);

        $('#row_prod').on('click','.pagination li a', async function(){
            //$('.items').html('<div class="text-center"><div class="spinner-grow text-success m-5" role="status"><span class="sr-only">Cargando...</span></div></div>');

            let pagina = $(this).attr('data');
            let desde  = $(this).attr('desde');	
            let busqueda  = $(this).attr('busqueda');
            let criterio  = $(this).attr('criterio');

            await objProd.getProductos(limitexpagina,Number(desde),busqueda,criterio,id_catego,id_sub_catego);
            
            //$('.items').fadeIn(2000).html(data);
            $('.pagination li').removeClass('active'); 
            $('.pagination li a[data="'+Number(pagina)+'"]').parent().addClass('active');

        }); 
    });
</script>

<div class="container">

    <div class="row text-center pt-5" style="color: violet;">
        <hr>
        <p>Puedes contactarnos por cualquiera de los medios para solicitar tu producto, visitanos en Facebook, Instagram o mandanos un WhatsApp!!!</p>
        <p> <strong>¡¡ YA TENEMOS MESES SIN INTERESES PREGUNTA POR LA PROMOCION !!!</strong></p>
        <hr>
    </div>
    

    <div class="row info pt-2">
        <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>'; color:#A70DB0 ;">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">INICIO</li>
            <li class="breadcrumb-item"><?php echo $nom_categoria ?></li>
            <li class="breadcrumb-item"><?php echo $nom_sub_categoria ?></li>
        </ol>
        </nav>
    </div>
    <div class="row items" id="row_prod">
        
    </div>
</div>


<input type="hidden" id="id_catego" value="<?php echo $id_catego ?>">
<input type="hidden" id="id_sub_catego" value="<?php echo $id_sub_catego ?>">

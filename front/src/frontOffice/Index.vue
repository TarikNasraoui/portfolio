<template>
    <div id="colorlib-page">
		<div class="container-wrap">
            <a href="#" class="js-colorlib-nav-toggle colorlib-nav-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><i></i></a>
            <Aside />
            <Main />
		</div>
    </div>
</template>
<script>
    import Aside from './Aside'
    import Main from './Main'
    export default {
        name: "Index",
        components: {
            Aside,
            Main
        }
    }
</script>
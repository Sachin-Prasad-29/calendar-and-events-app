<template>
    <div>
        <div id="box"></div>
        <div class="div-box">
            <aside>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/Mirror.png" alt="404 Image" />
            </aside>
            <main>
                <h1>Sorry!</h1>
                <p>Either you aren't cool enough to visit this page or it doesn't exist!</p>
                <router-link :to="{ name: 'login' }"><button class="btn-submit">Login</button></router-link>
            </main>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageNotFound',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Carter+One&display=swap');
* {
    box-sizing: 0;
    margin: 0;
    padding: 0;
}

body {
    background: linear-gradient(to right, white 50%, #383838 50%);
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.5;
    color: white;
}
.btn-submit {
    margin: 20px 0 15px 0;
    padding: 9px 30px;
    background-color: rgb(9, 168, 115);
    color: white;
    border: none;
    font-size: 1.2em;
    border-radius: 8px;
}

.div-box {
    display: flex;
    align-items: center;
    height: 100vh;
    max-width: 1000px;
    width: calc(100% - 4rem);
    margin: 0 auto;
}

.div-box > * {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    max-width: 500px;
    width: 100%;
    padding: 2.5rem;
}

aside {
    background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/right-edges.png');
    background-position: top right;
    background-repeat: no-repeat;
    background-size: 25px 100%;
}

aside img {
    display: block;
    height: auto;
    width: 100%;
}

main {
    text-align: center;
}

main h1 {
    font-family: 'Carter One', cursive;
    font-size: 5rem;
    color: #ea2323;
    margin-bottom: 1rem;
}

main p {
    margin-bottom: 2.5rem;
    color: red;
}

main p em {
    font-style: italic;
    color: #c5dc50;
}

@media (max-width: 700px) {
    body {
        background: #383838;
        font-size: 16px;
    }
    .div-box {
        flex-flow: column;
    }
    .div-box > * {
        max-width: 700px;
        height: 100%;
    }
    aside {
        background-image: none;
        /* background-color: white; */
    }
    aside img {
        max-width: 300px;
    }
}
@keyframes slideInLeft {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(0);
    }
}
#box {
    animation: 0.5s ease-out 0s 1 slideInLeft;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgb(16, 235, 137);
    background: linear-gradient(
        90deg,
        rgba(16, 235, 137, 0.276) 9%,
        rgba(121, 209, 155, 0.342) 36%,
        rgba(0, 229, 255, 0.326) 62%
    );

    z-index: -1;
    border-radius: 0 0 100% 0%;
}
</style>

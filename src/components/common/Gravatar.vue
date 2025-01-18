<template>
    <div class="gravatar-icon">
        <img :src="gravatarURL" alt="Gravatar" />
    </div>
</template>

<script>
import gravatar from 'gravatar';

export default {
    props: {
        email: {
            type: String,
            required: true
        }
    },
    computed: {
        // Calculer l'URL de l'image Gravatar en fonction de l'e-mail fourni
        gravatarURL() {
            return gravatar.url(this.email, { s: '200', r: 'pg', d: 'identicon' });
        }
    }
}
</script>
<style scoped>
.gravatar-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    overflow: hidden;
}

.gravatar-icon img {
    width: 100%;
    height: auto; 
}
</style>
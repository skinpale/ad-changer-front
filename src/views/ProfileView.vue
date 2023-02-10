<template>
    <div>
        <span class="white--text"> {{ response }} </span>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            response: ''
        }
    },
    mounted() {
        axios.get('http://localhost:8080/api/v1')
            .then(response => {
                this.response = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }
}
</script>
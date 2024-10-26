<script setup>
import { RouterLink } from 'vue-router'
import NotifCard from '@/components/NotifCard.vue'
</script>
<template>
    <section>

        <div class="p-2 flex flex-col w-full rounded-lg ">

            <h1 class="text-lg font-semibold text-black">Memberships</h1>
            <div class="flex space-x-2 p-4 shadow-3 rounded-lg text-sm">
                <div class="flex flex-col justify-center">
                    <h2 class="font-semibold ">Lotus Gym</h2>
                    <h2 class="mb-2">Card No: VH1234231</h2>
                    <h2>Name: Sarah Wayne</h2>
                    <h2 class="mb-2">Expiry Date: 12/20/21</h2>
                    <h2>Status: <span class="text-first font-semibold">Active</span></h2>
                </div>
                 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATYSURBVO3BQW4kSRIEQdNA/f/Lujz6KYBEenGaCxPBH6laclK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC365CUgv0nNBORGzRNAnlBzA+QJNROQ36TmjZOqRSdVi06qFn2yTM0mIN8E5EbNDZBJzaRmk5pNQDadVC06qVp0UrXoky8D8oSaJ9RMQJ5Q801AJjUTkEnNE0CeUPNNJ1WLTqoWnVQt+uSPAzKpeQLIpGYCcqNmAjKpmYBMav6fnFQtOqladFK16JM/Ts0EZFIzAZnUPKFmAjKpeQLIpOYvO6ladFK16KRq0SdfpuZfouYGyKRmArJJzRtq/iUnVYtOqhadVC36ZBmQ3wRkUjMBmdRMQCY1E5BJzQTkBsikZgIyqbkB8i87qVp0UrXopGoR/sgfBuQJNW8AeULNDZBJzV92UrXopGrRSdWiT14CMqmZgNyomYA8oWYCMql5Asik5g0gbwCZ1NwAmdRMQG7UvHFSteikatFJ1aJPlgG5UfOEmgnIjZobIJOaGyA3am6A3KiZgNwAuVFzo2YCsumkatFJ1aKTqkWfvKTmm4BsUvOEmieA3KiZgExqJiA3am6A3KjZdFK16KRq0UnVIvyRXwRkUvMEkEnNBOQJNU8AuVEzAblRcwPkDTU3QCY1b5xULTqpWnRStQh/5AUgk5oJyKRmAjKpmYBMam6A3KiZgExqJiBvqLkBMql5A8iNmm86qVp0UrXopGrRJy+pmYBMam7U3KiZgNyomYBMQDapmYDcAHkCyKTmRs0NkBs1b5xULTqpWnRSteiTl4C8AeQJNU+oeQLIpOab1ExAJjUTkEnNBOS/dFK16KRq0UnVIvyRF4B8k5oJyBtqJiCTmgnIpGYCMqnZBGRSMwGZ1NwAmdRsOqladFK16KRq0ScvqZmA3Kh5AsikZgIyqfkmIJOaGyCTmhsgk5oJyL/spGrRSdWik6pFnyxTcwNkUjMBmdRMQCY1E5BJzTcBuVHzTWpugPymk6pFJ1WLTqoWffISkEnNjZongDyhZgIyqbkB8oSaCcgEZFIzAdkE5EbNN51ULTqpWnRStQh/5A8BMqmZgExqngDyl6i5ATKp+aaTqkUnVYtOqhZ9sgzIG2omIJOaGzVPAPkmNROQTUD+JSdVi06qFp1ULcIf+cOAPKFmAjKpeQLIJjVPANmk5o2TqkUnVYtOqhZ98hKQ36TmRs0EZALyBJBJzW8CMql5Qs0EZFKz6aRq0UnVopOqRZ8sU7MJyBNAbtTcAHlDzQTkDTVPqLlR800nVYtOqhadVC365MuAPKHmCTUTkEnNBGRSM6m5ATKpmYBMam6ATEA2AblRs+mkatFJ1aKTqkWf/HFAJjUTkEnNDZBJzQ2QGyCTmknNBGRSMwG5ATKpuQEyqXnjpGrRSdWik6pFn/yfATKpmYDcqJmATGomIJOaGyCb1ExA/ksnVYtOqhadVC365MvUfJOaCcgEZFLzBpAngDyh5puATGo2nVQtOqladFK16JNlQH4TkBs1TwCZ1ExAJjVPqJmAPKFmAjKp+S+dVC06qVp0UrUIf6RqyUnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVp0UrXofxwUPT6g5VpYAAAAAElFTkSuQmCC"
                alt="" class="w-30 h-30 tablet:w-40 tablet:h-40">
            </div>
        </div>
    </section>
</template>
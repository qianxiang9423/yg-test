import { LOGINURLBASE, CREURL } from '../../api/api.js'"

$(function(){
    $(".customer-login").click(function(){
        window.open(`${LOGINURLBASE}`,"_blank")
    })

    $(".serviceCompany").on("click",function(){
        window.open(`${CREURL}`,"_blank")
    })
})
//LOGIN SET LOCALSTORAGE
$("#loginSubmit").submit(function(e) {
    localStorage.setItem("user", $("#floatingInput").val());
});

//Log Out
$("#logOut").click(function() {
    localStorage.removeItem("user");
    window.location = "../index.html";
});

//HOME GET LOCALSTORAGE
const helloUser = () => {
    const userName = localStorage.getItem("user");
    if (userName == undefined) {
        $("#helloUser").append(`Hello stranger`);
    } else {
        $("#helloUser").append(`Hello ${userName}`);
    }
};
helloUser();

//READY
$(document).ready(function() {
    $.get(GETURL, function(data, error) {
        //console.log(data);
        if (error == "success") {
            for (const video of data) {
                videos.push(
                    new Video(
                        video.id,
                        video.name,
                        video.link,
                        video.range,
                        video.category,
                        video.description,
                        video.gender
                    )
                );
            }
        } else {
            console.log(error);
        }
        generateVideos(videos);
    });
});

//LOAD
window.addEventListener("load", () => {
    $("#loginPage").fadeIn("slow");
    $("#homePage")
        .hide()
        .fadeIn("slow", () => {
            $("#catalog").slideDown(1000);
        });
});

//SUBMIT SEARCH
$("#searchForm").submit(function(e) {
    e.preventDefault();
    //AGARRAR Y FILTRAR LA BUSQUEDA
    const searchInput = $("#searchInput");
    const inputValue = searchInput.val();
    //console.log(inputValue);
    const filteredVideos = videos.filter((video) => {
        return video.name.toLowerCase().includes(inputValue);
    });
    //
    if (!videos) {
        $("#errorMsg").html(errorMsg);
    } else {
        generateVideos(filteredVideos);
    }
});

//CHECKBOX SEARCH
let checkArray = [];

$('input[type="checkbox"]').click(function() {
    if ($(this).prop("checked") == true) {
        const checkVal = $(this).prop("value");
        checkArray.push(checkVal);
        console.log(checkArray);
    } else if ($(this).prop("checked") == false) {
        const checkVal = $(this).prop("value");
        console.log(checkArray);
        checkArray.splice(checkArray.indexOf(checkVal), 1);
    }
});

$("#checkSearch").submit(function(e) {
    e.preventDefault();

    const checkVideos = videos.filter((video) => {
        return (
            checkArray.includes(video.range.toLowerCase()) ||
            checkArray.includes(video.category.toLowerCase()) ||
            checkArray.includes(video.gender.toLowerCase())
        );
    });
    if (checkVideos.length == 0) {
        generateVideos(videos);
    } else {
        generateVideos(checkVideos);
    }
});

//GENERAR VIDEOS
const generateVideos = (videos) => {
    const catalog = $("#catalog");
    catalog.html("");
    //
    for (const video of videos) {
        catalog.append(
            `<div id='cardWraper' class='col-12 col-xs-12 col-sm-6 col-lg-4 mb-3' >
                                    <div id="cardVideo" class="card  shadow" style="width: 300px">
                                                        <div class="video" data-toggle="modal" data-target="#exampleModal">
                                                            <iframe
                                                                width="100%"
                                                                height="200"
                                                                src="${video.link}"
                                                                title="YouTube video player"
                                                                frameborder="0"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowfullscreen
                                                            ></iframe>
                                                        </div>
        
                                                        <div class="card-body">
                                                            <h5 class="card-title">${video.name}</h5>
                                                            <p class="card-text">${video.description}</p>
                                                        </div>
                                                        <div id="cardFooter" class="card-footer">
                                                        <div class="container row  ">
                                                        <div class="col-9"><p class="card-text text-muted">#${video.range} #${video.category} #${video.gender}</p></div>
                                                        
                                                        <div class="col-3">
                                                        <button
                                                        id="watchButton"
                                                        type="button"
                                                        class=" btn btn-sm  btn-danger"
                                                        data-toggle="modal"
                                                        data-target="#exampleModal"
                                                    >
                                                        Watch
                                                    </button></div>
                                                            
                                                        </div>
                                                        </div>
                                                    </div>
                                    </div>
                                        `
        );
        generateModal(video);
    }
};

//GENERAR MODAL
const generateModal = (video) => {
    const modal = $("#myModal");

    $("#watchButton").click((e) => {
        modal.append(`<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${video.name}</h5>
                    <button type="button" class="btn btn-close" data-dismiss="modal" aria-label="Close">
							<strong>X</strong>
						</button>
                </div>
                <div class="modal-body">
                <iframe
                    width="100%"
                    height="100%"
                    src="${video.link}"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    ></iframe></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">
							Close
						</button>
                </div>
            </div>
        </div>
    </div>`);
    });
};
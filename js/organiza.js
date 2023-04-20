$(document).ready(() => {
  if(!localStorage.getItem('lives')) {
    localStorage.setItem('lives', JSON.stringify({lives: 3}));
  }

  let lives = JSON.parse(localStorage.getItem('lives')).lives;

  for(let i = 0; i < lives; i++) {
    $(`#heart-${i}`).fadeIn();
  }


  updateClock();
  const container = document.querySelector("#fondo-8");

  setTimeout(() => {
    $(".fondo8").fadeOut();
    $(".fondo8-1").fadeIn();
  }, 6000);

  setTimeout(() => {
    $(".fondo8-1").fadeOut();
    $(".fondo8-2").fadeIn();
  }, 12000);

  setTimeout(() => {
    $(".fondo8-2").fadeOut();
    $(".fondo8-3").fadeIn();
  }, 15000);

  let gridMesure = [];

  gridMesure = [1, 1];
  startGame(gridMesure);

  $(".juego-organiza2").click(() => {
    $(".fondo8-3").fadeOut();
    $(".fondo-organiza2").fadeIn();
    //  document.getElementById('audio1').play();
  });

  let removeVirus = 0;
  let deleteVirus = [];
  let leftItem = "";

  function startGame(gridMesure) {
    $(".obstaculo").draggable({
      axis: "both",
      containment: ".container",
      obstacle: ".obstaculo",

      preventCollision: true,

      grid: gridMesure,

      start: function (event, ui) {
        $(this).removeClass("obstaculo");
      },
      stop: function (event, ui) {
        $(this).addClass("obstaculo");

        function getObstacule(minHeight, maxHeight, rightPerson) {
          for (let i = 0; i < $(".obstaculo").length; i++) {
            let obstaculo = $(".obstaculo").eq(i).position();
            let obstaculoBottom =
              $(".obstaculo").eq(i).position().top +
              $(".obstaculo").eq(i).outerHeight();

              if($('.obstaculo').eq(i).position().top >= minHeight) {
                console.log("esta hacia abajo", $('.obstaculo').eq(i));
              } 

              if(($('.obstaculo').eq(i).position().top + $('.obstaculo').height()) <= minHeight) {
                console.log("esta hacia arriba", $('.obstaculo').eq(i));
              }
            }
            // if(obstaculo.top < maxHeight) {
            //   var posicionTop100 = $(".obstaculo").eq(i).offset().top;
            //   var posicionBottom100 = posicionTop100 + $(".obstaculo").eq(i).outerHeight();

            //   var posicionTop500 = minHeight;
            //   var posicionBottom500 = maxHeight;

            //   if (posicionTop500 >= posicionTop100 && posicionBottom500 <= posicionBottom100) {
            //     if (obstaculo.left > rightPerson) {
            //       console.log('hacia arriba', $(".obstaculo").eq(i).offset())
            //       return true;
            //     }
            //   }

            // } else {
            //   var posicionTop100 = $(".obstaculo").eq(i).offset().top;
            //   var posicionBottom100 = posicionTop100 + $(".obstaculo").eq(i).outerHeight();

            //   var posicionTop500 = minHeight;
            //   var posicionBottom500 = maxHeight;

            //   if (posicionTop500 <= posicionTop100 && posicionBottom500 >= posicionBottom100) {
            //     if (obstaculo.left > rightPerson) {
            //       console.log('hacia abajo', $(".obstaculo").eq(i).offset())
            //       return true;
            //     }
            //   }
            // }
        }

        const handleValidateVirus1ToUp = () => {
          if ($(".virus-1").attr("style")) {
            handleValidateVirus2ToDown();
          }

          let sujetoTop = $(".personaje-organiza").position().top,
            sujetoLeft = $(".personaje-organiza").position().left,
            sujetoRight =
              $(".personaje-organiza").position().left +
              $(".personaje-organiza").width(),
            virus1Top = $(".virus-1").position().top,
            virus1Left = $(".virus-1").position().left;

          let obstacule = 0;

          if (virus1Top < sujetoTop) {
            if (virus1Left > sujetoLeft && virus1Left < sujetoRight) {
              for (let i = 0; i < $(".obstaculo").length; i++) {
                let obstaculoLeft = $(".obstaculo").eq(i).position().left,
                  obstaculoTop = $(".obstaculo").eq(i).position().top;

                if (obstaculoTop < sujetoTop && obstaculoTop > virus1Top) {
                  if (
                    obstaculoLeft > sujetoLeft &&
                    obstaculoLeft < sujetoRight
                  ) {
                    obstacule++;
                    break;
                  }
                }
              }
            }
          }

          if (obstacule === 0) {
            let existsVirus = deleteVirus.find(
              (item) => item === $(".virus-1").attr("class").split(" ")[0]
            );

            if (!existsVirus) {
              deleteVirus.push($(".virus-1").attr("class").split(" ")[0]);
            }

            $(".caja2")
              .css({
                top: sujetoTop - 3,
                left: sujetoLeft,
              })
              .fadeIn();

            setTimeout(() => {
              $(".caja2").animate({ top: virus1Top }, 500);
            }, 500);

            setTimeout(() => {
              $(".virus-1").fadeOut();
            }, 1000);

            setTimeout(() => {
              $("#caja2").hide();
            }, 1500);
          }
        };

        const handleValidateVirus2ToDown = () => {
          let sujetoTop = $(".personaje-organiza").position().top,
            sujetoLeft = $(".personaje-organiza").position().left,
            sujetoRight =
              $(".personaje-organiza").position().left +
              $(".personaje-organiza").width(),
            virus1Top = $(".virus-2").position().top,
            virus1Left = $(".virus-2").position().left;

          let obstacule = 0;

          if (virus1Top > sujetoTop) {
            console.log("virus-2", virus1Left);
            console.log("sujeto", sujetoLeft);

            if (virus1Left >= sujetoLeft && virus1Left < sujetoRight) {
              for (let i = 0; i < $(".obstaculo").length; i++) {
                let obstaculoLeft = $(".obstaculo").eq(i).position().left,
                  obstaculoTop = $(".obstaculo").eq(i).position().top;

                if (obstaculoTop > sujetoTop && obstaculoTop < virus1Top) {
                  if (
                    obstaculoLeft > sujetoLeft &&
                    obstaculoLeft < sujetoRight
                  ) {
                    obstacule++;
                    return false;
                  }
                }
              }
            }
          }

          console.log("obstacule", obstacule);

          if (obstacule === 0) {
            let existsVirus = deleteVirus.find(
              (item) => item === $(".virus-2").attr("class").split(" ")[0]
            );

            if (!existsVirus) {
              deleteVirus.push($(".virus-2").attr("class").split(" ")[0]);
            }

            $(".caja2")
              .css({
                top: sujetoTop - 3,
                left: sujetoLeft,
              })
              .fadeIn();

            setTimeout(() => {
              $(".caja2").animate({ top: $(".virus-2").position().top }, 500);
            }, 500);

            setTimeout(() => {
              $(".virus-2").fadeOut();
            }, 1000);

            setTimeout(() => {
              $("#caja2").hide();
            }, 1500);

            console.log("virus", deleteVirus);
          }
        };

        const handleValidateVirus4ToUp = () => {
          let sujetoTop = $(".personaje-organiza").position().top,
            sujetoLeft = $(".personaje-organiza").position().left,
            sujetoRight =
              $(".personaje-organiza").position().left +
              $(".personaje-organiza").width(),
            virus1Top = $(".virus-4").position().top,
            virus1Left = $(".virus-4").position().left;

          let obstacule = 0;

          if (virus1Top > sujetoTop) {
            console.log("virus-4", virus1Left);
            console.log("sujeto", sujetoLeft);

            if (virus1Left >= sujetoLeft && virus1Left < sujetoRight) {
              for (let i = 0; i < $(".obstaculo").length; i++) {
                let obstaculoLeft = $(".obstaculo").eq(i).position().left,
                  obstaculoTop = $(".obstaculo").eq(i).position().top;

                if (obstaculoTop > sujetoTop && obstaculoTop < virus1Top) {
                  if (
                    obstaculoLeft > sujetoLeft &&
                    obstaculoLeft < sujetoRight
                  ) {
                    obstacule++;
                    return false;
                  }
                }
              }
            }
          }

          if (obstacule === 0) {
            let existsVirus = deleteVirus.find(
              (item) => item === $(".virus-4").attr("class").split(" ")[0]
            );

            if (!existsVirus) {
              deleteVirus.push($(".virus-4").attr("class").split(" ")[0]);
            }

            $(".caja2")
              .css({
                top: sujetoTop - 3,
                left: sujetoLeft,
              })
              .fadeIn();

            setTimeout(() => {
              (".caja2").animate({ top: $(".virus-4").position().top }, 500);
            }, 500);

            setTimeout(() => {
              $(".virus-4").fadeOut();
            }, 1000);

            setTimeout(() => {
              $("#caja2").hide();
            }, 1500);
          }

          $(".personaje-organiza").animate({ left: "72%" }, 1000);
          setTimeout(() => {
            $('.genial').fadeIn();
            $('.fondo-organiza2').fadeOut();
          }, 3000)
        }

        const handleValidateVirus3ToDown = () => {
          let sujetoTop = $(".personaje-organiza").position().top,
            sujetoLeft = $(".personaje-organiza").position().left,
            sujetoRight =
              $(".personaje-organiza").position().left +
              $(".personaje-organiza").width(),
            virus1Top = $(".virus-3").position().top,
            virus1Left = $(".virus-3").position().left;

          let obstacule = 0;

          if (virus1Top > sujetoTop) {
            console.log("virus-3", virus1Left);
            console.log("sujeto", sujetoLeft);

            if (virus1Left >= sujetoLeft && virus1Left < sujetoRight) {
              for (let i = 0; i < $(".obstaculo").length; i++) {
                let obstaculoLeft = $(".obstaculo").eq(i).position().left,
                  obstaculoTop = $(".obstaculo").eq(i).position().top;

                if (obstaculoTop > sujetoTop && obstaculoTop < virus1Top) {
                  if (
                    obstaculoLeft > sujetoLeft &&
                    obstaculoLeft < sujetoRight
                  ) {
                    obstacule++;
                    return false;
                  }
                }
              }
            }
          }

          if (obstacule === 0) {
            let existsVirus = deleteVirus.find(
              (item) => item === $(".virus-3").attr("class").split(" ")[0]
            );

            if (!existsVirus) {
              deleteVirus.push($(".virus-3").attr("class").split(" ")[0]);
            }

            $(".caja2")
              .css({
                top: sujetoTop - 3,
                left: sujetoLeft,
              })
              .fadeIn();

            setTimeout(() => {
              $(".caja2").animate({ top: $(".virus-3").position().top }, 500);
            }, 500);

            setTimeout(() => {
              $(".virus-3").fadeOut();
            }, 1000);

            setTimeout(() => {
              $("#caja2").hide();
            }, 1500);
          }

          handleValidateVirus4ToUp();
        };

        handleValidateVirus1ToUp();

        console.log("virusdelete", deleteVirus.length);
        getObstacule(
          $(".personaje-organiza").position().top,
          $(".personaje-organiza").position().top +
            $(".personaje-organiza").height(),
          $(".personaje-organiza").position().left +
            $(".personaje-organiza").width()
        );

        if (deleteVirus.length === 2) {
          let obstacule = getObstacule(
            $(".personaje-organiza").position().top,
            $(".personaje-organiza").position().top +
              $(".personaje-organiza").height(),
            $(".personaje-organiza").position().left +
              $(".personaje-organiza").width()
          );

          console.log("obstacule", obstacule);

          if (obstacule === undefined) {
            console.log("leftItems", leftItem);
            if (leftItem === "44.6%") {
              $(".personaje-organiza").animate(
                {
                  left: "57%",
                },
                500
              );
              leftItem = "57%";

              setTimeout(() => {
                handleValidateVirus3ToDown();
              }, 2000);
            } else {
              leftItem = "44.6%";
              $(".personaje-organiza").animate(
                {
                  left: "44.6%",
                },
                1000
              );
            }
          }
        }

        // handleValidateVirus2ToDown();

        var $obstaculo = $(this);
        var position = $obstaculo.position();

        // console.log($virus.length);

        // let obstacule = 0;
        // let virus = null;
        // $virus.each((item) => {
        //   if ($virus.eq(item).position().top > $sujeto.position().top) {
        //     obstacule = 0;
        //     virus = null;
        //     if (
        //       $virus.eq(item).position().left >= $sujeto.position().left &&
        //       $virus.eq(item).position().left <=
        //         $sujeto.position().left + $sujeto.width()
        //     ) {
        //       console.log("items less", $virus.eq(item));
        //       console.log("get virus", $virus.eq(item).position().top);
        //       console.log("left virus", $virus.eq(item).position().left);
        //       console.log(
        //         "get sujeto",
        //         $(".personaje-organiza").position().top
        //       );
        //       console.log(
        //         "left sujeto",
        //         $(".personaje-organiza").position().left
        //       );
        //       console.log(
        //         "right sujeto",
        //         $(".personaje-organiza").position().left +
        //           $(".personaje-organiza").width()
        //       );
        //       $(".obstaculo").each((index) => {
        //         let obstaculoTop = $(".obstaculo").eq(index).position().top,
        //           sujetoTop = $(".personaje-organiza").position().top,
        //           obstaculoLeft = $(".obstaculo").eq(index).position().left,
        //           sujetoRight =
        //             $(".personaje-organiza").position().left +
        //             $(".personaje-organiza").width(),
        //           sujetoLeft = $(".personaje-organiza").position().left,
        //           virusTop = $('.virus:not([style*="display: none"])')
        //             .eq(item)
        //             .position().top;
        //         virusLeft = $('.virus:not([style*="display: none"])')
        //           .eq(item)
        //           .position().left;

        //         let obstacules = 0;
        //         if (
        //           obstaculoTop > sujetoTop &&
        //           obstaculoLeft > sujetoLeft &&
        //           obstaculoLeft < sujetoRight
        //         ) {
        //           obstacules++;
        //           console.log("obstaculo", $(".obstaculo").eq(index));
        //           return false;
        //         }

        //         console.log("Obstacules", obstacules);
        //         try {
        //         } catch (error) {
        //           console.error(error);
        //         }

        //         handleObstacule()
        //           .then((res) => {
        //             console.log("res", res);
        //             if (!res) {
        //               return false;
        //             } else {
        //               console.log("exists");
        //             }
        //           })
        //           .catch((err) => console.error(err));
        //       });
        //     }
        //   }

        //   if ($virus.eq(item).position().top < $sujeto.position().top) {
        //     if (
        //       $virus.eq(item).position().left >= $sujeto.position().left &&
        //       $virus.eq(item).position().left <=
        //         $sujeto.position().left + $sujeto.width()
        //     ) {
        //       console.log($(".virus"));
        //       $(".obstaculo").each((index) => {
        //         let obstaculoTop = $(".obstaculo").eq(index).position().top,
        //           sujetoTop = $(".personaje-organiza").position().top,
        //           obstaculoLeft = $(".obstaculo").eq(index).position().left,
        //           sujetoRight =
        //             $(".personaje-organiza").position().left +
        //             $(".personaje-organiza").width(),
        //           sujetoLeft = $(".personaje-organiza").position().left,
        //           virusTop = $('.virus:not([style*="display: none"])')
        //             .eq(item)
        //             .position().top;
        //         virusLeft = $('.virus:not([style*="display: none"])')
        //           .eq(item)
        //           .position().left;

        //         let obstacule = 0;
        //         let virus = null;

        //         if (
        //           virusTop < sujetoTop &&
        //           virusLeft >= sujetoLeft &&
        //           virusLeft <= sujetoRight
        //         ) {
        //           virus = $('.virus:not([style*="display: none"])').eq(item);
        //           if (
        //             obstaculoTop < sujetoTop &&
        //             obstaculoLeft > sujetoLeft &&
        //             obstaculoLeft < sujetoRight
        //           ) {
        //             obstacule++;
        //             console.log("obstaculo", $(".obstaculo").eq(index));
        //             return false;
        //           }
        //         }

        //         if (obstacule === 0) {
        //           if (
        //             !deleteVirus.find(
        //               (item) => item === virus.attr("class").split(" ")[0]
        //             )
        //           ) {
        //             deleteVirus.push(virus.attr("class").split(" ")[0]);
        //           }
        //           $(".caja2")
        //             .css({
        //               top: $sujeto.position().top - 3,
        //               left: $sujeto.position().left,
        //             })
        //             .fadeIn();
        //           setTimeout(() => {
        //             $(".caja2").animate(
        //               { top: $virus.eq(item).position().top },
        //               500
        //             );
        //           }, 500);

        //           setTimeout(() => {
        //             virus.fadeOut();
        //           }, 1000);
        //           setTimeout(() => {
        //             $("#caja2").hide();
        //           }, 1500);
        //         }
        //       });
        //     }
        //   }
        // });

        // let personaje = $(".personaje-organiza").position();

        // function getObstacule(minHeight, maxHeight, rightPerson) {
        //   for (let i = 0; i < $(".obstaculo").length; i++) {
        //     let obstaculo = $(".obstaculo").eq(i).position();
        //     if (obstaculo.top < maxHeight && obstaculo.top > minHeight) {
        //       if (obstaculo.left > rightPerson) {
        //         return true;
        //       }
        //     }
        //   }
        // }

        // if (deleteVirus.length === 2) {
        //   if (
        //     !getObstacule(
        //       personaje.top,
        //       personaje.top + $(".personaje-organiza").height(),
        //       personaje.left + $(".personaje-organiza").width()
        //     )
        //   ) {
        //     $(".personaje-organiza").animate(
        //       {
        //         left: "44.6%",
        //       },
        //       1000
        //     );
        //   } else {
        //     $(".personaje-organiza").animate(
        //       {
        //         left: "57%",
        //       },
        //       1000
        //     );
        //   }
        // } else if (deleteVirus.length === 2) {
        //   $(".personaje-organiza").animate(
        //     {
        //       left: "57%",
        //     },
        //     1000
        //   );
        // } else if (deleteVirus.length === 4) {
        //   $(".personaje-organiza").animate(
        //     {
        //       left: "63%",
        //     },
        //     1000
        //   );
        // }

        // console.log(deleteVirus);
      },
    });

    let elementsInside = ["caja1", "panel1"];
    const character = $(".personaje-organiza");

    $(".container").droppable({
      tolerance: "touch",
      drop: (event, { draggable }) => {
        if (!elementsInside.includes(draggable[0].id)) {
          elementsInside.push(draggable[0].id);
        }
      },
      out: (event, { draggable }) => {
        if (elementsInside.includes(draggable[0].id)) {
          const index = elementsInside.indexOf(draggable[0].id);
          elementsInside.splice(index, 1);
        }

        if (elementsInside.length == 0) {
          $(".disable-draggable").draggable("disable");

          setTimeout(() => character.css("left", "69%"), 300);
          setTimeout(() => {
            $(".juego-organiza2").fadeOut();
            $(".genial").fadeIn();
            // document.getElementById('audio1').pause();
            // document.getElementById('audio3').play();
          }, 6000);
        }
      },
    });
  }

  var totalTime = 90;

  function updateClock() {
    if (totalTime) {
      document.getElementById("countdown").innerText = totalTime;
    }
    if (totalTime == 0) {
      $(".error-organiza").fadeIn();
      let lives = JSON.parse(localStorage.getItem('lives')).lives;
      if((lives-1) < 0 ) {
        localStorage.setItem('lives', JSON.stringify({lives: 3}));
      } else {
        localStorage.setItem('lives', JSON.stringify({lives: lives -1}));
      }
    } else {
      totalTime -= 1;
      setTimeout(() => updateClock(), 1000);
    }
  }
});

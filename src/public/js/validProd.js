window.addEventListener("load", function () {
    let formulario = document.querySelector("formulario");

    formulario.addEventListener("submit", function (e) {

        let errores = [];

        let title = document.querySelector("title");
        let description = document.querySelector("description");

        if (title.value == "") {
            errores.push("Tienes que escribir un titulo")
        } else if (title.value.length < 6) {
            errores.push("Escribir titulo de 5 caracteres como minimo");
        };

        if (description.value == "") {
            errores.push("Tienes que escribir una descripcion")
        };

        var $input = $('#file');
        var valid_extensions = ['png', 'jpg', 'jpeg', 'gif'];
        $input.on('change', function (e) {
            var $this = this;
            var files = $this.files;

            // If there is more than one file
            if (files) {
                if ($this.files.length > 1) {

                    // TODO: loop for more one file

                } else {

                    var file = this.files[0];
                    if (!validar_extension(file)) {
                        errores.push('Extension invalida');
                    }

                }
            }
        });

        if(errores.length > 0){
            e.preventDefault();

            let ulErrores = document.querySelector("div.errores.ul");
            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>";
                
            }
        }

        function validar_extension(file) {
            var file_name = file.name,
                file_extension = file_name.split('.').pop();

            return valid_extensions.includes(file_extension);
        }
    });
})
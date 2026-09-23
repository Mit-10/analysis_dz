let person = [];
let specializations = [];
let cities = [];

Promise.all(
    [
        fetch("person.json"),
        fetch("specializations.json"),
        fetch("cities.json"),
    ]
).then(async([personResponse, specializationsResponse,citiesResponse]) => {
    const personJson = await personResponse.json();
    const specializationsJson = await specializationsResponse.json();
    const citiesJson = await citiesResponse.json();
    return [personJson, specializationsJson, citiesJson];
})

    .then(response => {
        person = response[0];
        specializations = response[1];
        cities = response[2];

        let designers = person.filter(function (user) {
            return user.personal.specializationId === 3;
        });

        let designersWithFigma = designers.filter(function (user) {
            return user.skills.some(function (skill) {
                return skill.name === "Figma";
            });
        });

        designersWithFigma.forEach(function (user) {
            console.log(getInfo.call(user.personal));
        });


        let reactDeveloper = person.find(function (user) {
            return user.skills.some(function (skill) {
                return skill.name === "React";
            });
        });

        console.log(getInfo.call(reactDeveloper.personal));


        let allAdults = person.every(function (user) {
            let birthday = user.personal.birthday.split(".");
            let birthDate = new Date(
                birthday[2],
                birthday[1] - 1,
                birthday[0]
            );

            let today = new Date();

            let age = today.getFullYear() - birthDate.getFullYear();

            if (
                today.getMonth() < birthDate.getMonth() ||
                (
                    today.getMonth() === birthDate.getMonth() &&
                    today.getDate() < birthDate.getDate()
                )
            ) {
                age--;
            }

            return age >= 18;
        });

        console.log("Все пользователи старше 18 лет:", allAdults);


        let backendFromMoscow = person
            .filter(function (user) {
                return user.personal.specializationId === 2;
            })
            .filter(function (user) {
                let city = cities.find(function (cityItem) {
                    return cityItem.id === user.personal.locationId;
                });

                return city.name === "Москва";
            })
            .filter(function (user) {
                return user.request.some(function (request) {
                    return request.name === "Тип занятости" &&
                        request.value === "Полная";
                });
            })
            .sort(function (a, b) {
                let salaryA = a.request.find(function (request) {
                    return request.name === "Зарплата";
                });

                let salaryB = b.request.find(function (request) {
                    return request.name === "Зарплата";
                });

                return salaryA.value - salaryB.value;
            });

        console.log(backendFromMoscow);


        let goodDesigners = person.filter(function (user) {
            return user.personal.specializationId === 3 &&
                user.skills.some(function (skill) {
                    return skill.name === "Photoshop" && skill.level >= 6;
                }) &&
                user.skills.some(function (skill) {
                    return skill.name === "Figma" && skill.level >= 6;
                });
        });

        console.log(goodDesigners);

        let bestDesigner = person
            .filter(function (user) {
                return user.personal.specializationId === 3;
            })
            .filter(function (user) {
                return user.skills.some(function (skill) {
                    return skill.name === "Figma";
                });
            })
            .sort(function (a, b) {
                let figmaA = a.skills.find(function (skill) {
                    return skill.name === "Figma";
                });

                let figmaB = b.skills.find(function (skill) {
                    return skill.name === "Figma";
                });

                return figmaB.level - figmaA.level;
            })[0];


        let bestFrontend = person
            .filter(function (user) {
                return user.personal.specializationId === 1;
            })
            .filter(function (user) {
                return user.skills.some(function (skill) {
                    return skill.name === "Angular";
                });
            })
            .sort(function (a, b) {
                let angularA = a.skills.find(function (skill) {
                    return skill.name === "Angular";
                });

                let angularB = b.skills.find(function (skill) {
                    return skill.name === "Angular";
                });

                return angularB.level - angularA.level;
            })[0];

        let bestBackend = person
            .filter(function (user) {
                return user.personal.specializationId === 2;
            })
            .filter(function (user) {
                return user.skills.some(function (skill) {
                    return skill.name === "Go";
                });
            })
            .sort(function (a, b) {
                let goA = a.skills.find(function (skill) {
                    return skill.name === "Go";
                });

                let goB = b.skills.find(function (skill) {
                    return skill.name === "Go";
                });

                return goB.level - goA.level;
            })[0];


        console.log("Команда:");

        console.log(getInfo.call(bestDesigner.personal));
        console.log(getInfo.call(bestFrontend.personal));
        console.log(getInfo.call(bestBackend.personal));
    })

    function getInfo() {
    const city = cities.find(city => city.id === this.locationId)
        return `${this.firstName} ${this.lastName}, ${city.name}`;
    }




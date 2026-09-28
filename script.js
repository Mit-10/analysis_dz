let person = [];
let specializations = [];
let cities = [];

Promise.all([
    fetch("person.json"),
    fetch("specializations.json"),
    fetch("cities.json"),
])
    .then(async ([personResponse, specializationsResponse, citiesResponse]) => {

        const personJson = await personResponse.json();
        const specializationsJson = await specializationsResponse.json();
        const citiesJson = await citiesResponse.json();

        return [personJson, specializationsJson, citiesJson];
    })
    .then(response => {

        person = response[0];
        specializations = response[1];
        cities = response[2];

        getDesigners();
        getReactDeveloper();
        allIsOlder();
        getBackendDev();
        figmaPhtoshopDesigners();
        bestTeam();
    });


function getSpecialization(specializationName) {

    return specializations.find(function (specialization) {
        return specialization.name === specializationName;
    });
}


function getCity(city) {

    return cities.find(function (cityItem) {
        return cityItem.id === city || cityItem.name === city;
    });
}


function getInfo() {

    const city = getCity(this.locationId);

    return `${this.firstName} ${this.lastName}, ${city.name}`;
}


function getDesigners() {

    const designer = getSpecialization("designer");

    const designers = person
        .filter(function (user) {
            return user.personal.specializationId === designer.id;
        })
        .filter(function (user) {

            return user.skills.some(function (skill) {
                return skill.name === "Figma";
            });

        });

    designers.forEach(function (user) {
        console.log(getInfo.call(user.personal));
    });
}



function getReactDeveloper() {

    const reactDeveloper = person.find(function (user) {

        return user.skills.some(function (skill) {
            return skill.name === "React";
        });

    });

    console.log(getInfo.call(reactDeveloper.personal));
}


function allIsOlder() {

    const allAdults = person.every(function (user) {

        const birthday = user.personal.birthday.split(".");

        const birthDate = new Date(
            birthday[2],
            birthday[1] - 1,
            birthday[0]
        );

        const today = new Date();

        let age =
            today.getFullYear() -
            birthDate.getFullYear();

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

    console.log(
        "Все пользователи старше 18 лет:",
        allAdults
    );
}


function getBackendDev() {

    const backend = getSpecialization("backend");
    const moscow = getCity("Москва");

    const backendFromMoscow = person
        .filter(function (user) {

            return user.personal.specializationId === backend.id;

        })
        .filter(function (user) {

            return user.personal.locationId === moscow.id;

        })
        .filter(function (user) {

            return user.request.some(function (request) {

                return request.name === "Тип занятости" &&
                    request.value === "Полная";

            });

        })
        .sort(function (a, b) {

            const salaryA = a.request.find(function (request) {
                return request.name === "Зарплата";
            });

            const salaryB = b.request.find(function (request) {
                return request.name === "Зарплата";
            });

            return salaryA.value - salaryB.value;
        });

    backendFromMoscow.forEach(function (user) {
        console.log(getInfo.call(user.personal));
    });
}



function figmaPhtoshopDesigners() {

    const designer = getSpecialization("designer");

    const goodDesigners = person.filter(function (user) {

        const isDesigner = user.personal.specializationId === designer.id;

        const hasPhotoshop = user.skills.some(function (skill) {

                return skill.name === "Photoshop" &&
                    skill.level >= 6;

            });

        const hasFigma = user.skills.some(function (skill) {

                return skill.name === "Figma" &&
                    skill.level >= 6;

            });

        return isDesigner && hasPhotoshop && hasFigma;
    });

    goodDesigners.forEach(function (user) {
        console.log(getInfo.call(user.personal));
    });
}


function getSpecialPerson(specializationName, skillName) {

    const specialization = getSpecialization(specializationName);

    const specialists = person
        .filter(function (user) {

            return user.personal.specializationId === specialization.id;

        })
        .filter(function (user) {

            return user.skills.some(function (skill) {
                return skill.name === skillName;
            });

        })
        .sort(function (a, b) {

            const skillA = a.skills.find(function (skill) {
                return skill.name === skillName;
            });

            const skillB = b.skills.find(function (skill) {
                return skill.name === skillName;
            });

            return skillB.level - skillA.level;
        });

    return specialists[0];
}

function bestTeam() {

    const designer = getSpecialPerson(
        "designer",
        "Figma"
    );

    const frontend = getSpecialPerson(
        "frontend",
        "Angular"
    );

    const backend = getSpecialPerson(
        "backend",
        "Go"
    );

    console.log("Команда:");

    console.log(getInfo.call(designer.personal));

    console.log(getInfo.call(frontend.personal));

    console.log(getInfo.call(backend.personal));
}
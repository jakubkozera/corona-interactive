const lowerCaseCountryNameParts = ["and", "the", "of"]
const exceptionNameParts = [{
    part: "us",
    formatTo: "United States"
}]
export default function countryNameFromRoute(route) {
    const countryParts = route.split("-");
    let countryPartAssembled = []
    for (let i = 0; i < countryParts.length; i++) {
        if (isCountryPartException(countryParts[i])) {
            countryPartAssembled.push(exceptionNameParts.filter(exc => exc.part === countryParts[i])[0].formatTo)
        } else if (countryPartIsNotLowerCase(countryParts[i])) {
            const upperCaseCountryNamePart = countryParts[i][0].toUpperCase() + countryParts[i].slice(1);
            countryPartAssembled.push(upperCaseCountryNamePart)
        } else {
            countryPartAssembled.push(countryParts[i])
        }
    }

    return countryPartAssembled.join(" ");
}

function isCountryPartException(countryPart) {
    const exceptionElement = exceptionNameParts.filter(exc => exc.part === countryPart)[0];
    return exceptionElement !== undefined;
}

function countryPartIsNotLowerCase(countryPart) {
    const lowerCaseElement = lowerCaseCountryNameParts.filter(cp => cp === countryPart)[0];
    return lowerCaseElement === undefined;
}
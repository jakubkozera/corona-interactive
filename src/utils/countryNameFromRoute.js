const lowerCaseCountryNameParts = ["and", "the", "of"]
export default function countryNameFromRoute(route) {
    const countryParts = route.split("-");
    let countryPartAssembled = []
    for(let i = 0; i < countryParts.length; i++) {
        if(countryPartIsNotLowerCase(countryParts[i])){
            const upperCaseCountryNamePart = countryParts[i][0].toUpperCase() + countryParts[i].slice(1);
            countryPartAssembled.push(upperCaseCountryNamePart)
        } else {
            countryPartAssembled.push(countryParts[i])
        }
    }

    return countryPartAssembled.join(" ");
}

function countryPartIsNotLowerCase(countryPart) {
    const lowerCaseElement = lowerCaseCountryNameParts.filter(cp => cp === countryPart)[0];
    return lowerCaseElement === undefined;
}
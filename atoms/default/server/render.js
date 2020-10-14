import mainTemplate from "./atoms/default/server/templates/main.html!text"
import Mustache from 'mustache'
import rp from 'request-promise'

export function render() {

    return rp({
        uri: "https://interactive.guim.co.uk/docsdata-test/1kjAin5is3uhwQAmh8wDRtZo-CGFqpgTZLOmjYgH-07U.json",
        json: true
    }).then((data) => {
        var html = Mustache.render(mainTemplate, data.sheets);
        return html;
    });

}



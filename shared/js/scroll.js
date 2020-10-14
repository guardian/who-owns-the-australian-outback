import ScrollyTeller from "shared/js/scrollyteller"

export default {

	init: (elem="#scrolly-1") => {

		const scrolly = new ScrollyTeller({
			parent: document.querySelector(elem),
			triggerTop: 1/3, // percentage from the top of the screen that the trigger should fire
			triggerTopMobile: 0.75,
			transparentUntilActive: true
	     });

		scrolly.addTrigger({num: 1, do: () => {

			console.log("Testing 1 2 3")

		}});

		scrolly.watchScroll();

	}

}


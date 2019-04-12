/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* "RSS Feeds" test suite */
    describe('RSS Feeds', function () {
        /* tests to make sure that the allFeeds variable
        has been defined and that it is not empty.  */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* a test that ensures all feeds has a URL defined
         * and that the URL is not empty. additional: check
         it has http word*/
        it('has url info defined and not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toEqual("");
                expect(feed.url).toContain("http");
            });
        });

        /* a test that ensures all feeds has a name defined
         * and that the name is not empty.*/
        it('has name info defined and not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toEqual("");
            });
        });

    });


    /* "The menu" test suite */
    describe('The menu', function () {
        /*  menu element is hidden by default. */
        it('is hidden by default', function () {
            var bodyElement = document.body;
            expect(bodyElement.classList).toContain('menu-hidden');

        });

        /* the menu changes visibility when the menu icon is clicked. 
        two expectations: 
        1- menu display when clicked
        2- menu hide when clicked again.
        */

        it('changes visibility when the menu icon is clicked', function () {

            var bodyElement = document.body;

            menuIcon = $('.menu-icon-link')[0];

            spyOnEvent(menuIcon, 'click');

            menuIcon.click();
            expect(bodyElement.classList).not.toContain('menu-hidden');

            menuIcon.click();
            expect(bodyElement.classList).toContain('menu-hidden');

        });

    });

    /* "Initial Entries" test suite  */
    describe('Initial Entries', function () {
        /*  ensures when the loadFeed function is called and 
         * completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        it('has at least a single entry', function (done) {
            expect($('.feed')).not.toBeEmpty();
            done();
        });
    });



    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {

        let beforeFeed;
        let afterFeed;
        let feedList = $('.feed');

        beforeEach(function (done) {
            beforeFeed = feedList[0].innerHTML;
            console.log(beforeFeed)
            loadFeed(2, function () {
                done();
            });
        });

        /* ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('content change', function (done) {
            afterFeed = feedList[0].innerHTML;
            expect(afterFeed).not.toBe(beforeFeed);
            done();
        });
    });
}());

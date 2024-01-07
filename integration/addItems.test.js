describe('addItemForm', function () {
    it('base example, visual looks correct', async () => {
        await page.goto('http://localhost:9009/iframe.html?args=&id=todolist-additems--add-items-story&viewMode=story',
            {waitUntil: "networkidle2"})

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    })
});
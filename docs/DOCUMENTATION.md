# Documentation

The onepage-bundle add the module  *"One Page Navigation"* to the contao modules. The one page module can display defined articles as navigation points of the current visited page or one referenced page. You can select the option *"Show in one page navigation"* in each article you want to show in the one page navigation module.

Add the one page navigation module to your site layout.

## Module Settings

### Redirect Settings

**Reference page**

You can select a reference page from where the one page navigation will load the articles to display in the one page navigation module. If the visited page is not the reference page the one page module redirect to the reference page. If the reference page is not set the one page navigation will show you the articles of the visited page.

## Article Settings

In the article settings under the legend *"One Page Settings"* you can now find a checkbox.

If the checkbox *"Show in one page navigation"* is selected the article will be displayed in the one page navigation.

## Possible Setup

Considering the following site and article structure

- Root page
    - Homepage (Page) *Defined as reference page in the module*
        - About us (Article) *Show in one page navigation* is selected
        - Parallax 1 Section (Article) ~~Show in one page navigation~~ is not selected
        - Team (Article) *Show in one page navigation* is selected
        - Parallax 2 Section (Article) ~~Show in one page navigation~~ is not selected
        - Contact (Article) *Show in one page navigation* is selected
    - Imprint (Page)
        - Imprint (Article) ~~Show in one page navigation~~ is not selected
    - Disclaimer (Page)
        - Disclaimer (Article) ~~Show in one page navigation~~ is not selected

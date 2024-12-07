# NoteBook Website
#### Video Demo:  <URL https://youtu.be/OeZ6kmeJGAc?si=jabYmzaTjyjcpJHt>
#### Description:
**In Backend:** 
I used **Django**, a framework of python language.
I have a virtual enviroment callde **.venv** that is for all of dependencies and libraries installed for my backend-side.

There is a **node_modules** folder in my backend. The main reason that I have it in backend is CORS policies.


**server** folder is the main folder of backend, so let's dive into it:

    server
        server
        notes

<ins>server</ins> folder is handler of any request from frontend-side and it have APIs as built-in which are used for some functionality such as:

- login
- register
- add-notes
- delete-notes
- note-list
- note-details
- user-notes

> Of course, my code is redundant and all its functions are not used, and sometimes it is made to continue development, sometimes it is made to understand and work with the internal functions of the framework, so accept me as a beginner.

I used **TokenAuthentication** of Django Rest Framework called **DRF** for authorize users. I added related settings in settings.py and I used for required APIs which require authentication for accesability.

in <ins>notes</ins> folder:
    
    migrations //all of migrations logs that I did for rebuild detabase structure.
    admin.py //I added notes table in django admin panel
    models.py //I implemented the structure of database with ORM fields
    serializers.py //I make Note structure of json we want to exchange between front & back
    views.py //all of functionallity that I said(except register & login)

in <ins>server</ins> folder:

    serializers.py // I make User structure of json we want exchange
    settings.py // all of settings(Token, CORS, ...), apps I used and created, database configuration and ...
    urls.py //all of endpoint of APIs and routes I have.
    views.py //functionality of register & login


**In Frontend:** 
The base of frontend is **VITE**. I used **React js** for dividing project into individual components.
I used **TypeScript** for Specify the types accurately.
with react js, I coded function-based components and I used hooks and states for containing and modifying data and manage some functionality such as **Navigate with useNavigate() | useNavigation()**.

I handled event on elements with functions triggered with onChange() | onClick() and for some of these, I passed **e** [stands for **event**] for accesability to data that modified.

In order to have access from the time the component is created to the time it dies, and to be able to do things every one of these times, or to be able to do things for every change of any parameter I chose and the component is being re-rendered. I used **useEffect()** to do.

I have node_modules as the same in backend it contains all of dependencies and libraries I installed.  such as:

    React-router-dom //for routes and displacement between pages in one page (Single page App called SPA)
    
frontend handles routes and user interface of pages, I used **shadcn** for To use ui components.

I saved Token with a specific structure in localstorage and with every request which requires a Token to receive information or apply a functionality on server-side, I will give it from localstorage and 
pass it into header or body of my request(Json request structure) to qualify.

    public //I keep fonts(static files in a more general view) in it
    src //The main folder of client-side I have(I will explain it in details)
    index.html //main html file
    config.js & config.json files //for settings of my frontend

    .gitignore //Some folders don't need to be kept in git, especially large ones. For this, only a file of library names is kept, and to run the project on another device, all the libraries mentioned in it can be installed with a command.

In <ins>src</ins> folder:

    components //which contains shadcn UI components in code.
    core //which contains services of axios like Interceptors.
    features //It is to create features separately and to be reusable for other projects.
    layouts //Many similar structures are repeated on different pages, instead of reloading them constantly, we keep them in the parent format.
    pages //pages wil loaded in layouts and showing informations.
    app.css //all of styles I have.
    app.tsx //main file of project which render all of files I have recursively.
    router.tsx //all of routes and actions which are supposed to be done to load the pages.

AND DONE!
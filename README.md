Base REACT-SPRING BOOT application
===

## From author:
This project was downloaded from: `https://github.com/kantega/react-and-spring` 
and was updated by author relies on his own requirements for fast building and starting web application

## Project specification:
Chat web application with configured swagger support, built by TDD technology

## Starting React application for DEV:
To start react application you have to run `npm install`  in terminal in frontend directory and after all dependencies will be installed
you have to run `react-scripts start`  in terminal

## Packaging the React app with Spring Boot
We'd like to be able to publish *one* jar file to production, and that jar file should
contain both the backend and the frontend. Spring Boot applications can serve static content if you put
it into the `classes/public` directory of the application jar file. Create React App can build a 
static bundle for production by running `npm build` in the frontend directory.

To accomplish this, we have to do the following: 
 
   1. create a production build of the frontend 
   2. copy the production build into `${target/classes/public}`

We'll use `frontend-maven-plugin` in step 1, and `maven-antrun-plugin` in step 2. When we're done, 
we can just type `$ mvn clean install` and we'll end up with a single jar file containing both
the frontend and the backend. 

### Run npm from maven
Add the following to `pom.xml` under `/build/plugins`:  
```xml
<plugin>
    <groupId>com.github.eirslett</groupId>
    <artifactId>frontend-maven-plugin</artifactId>
    <version>1.6</version>
    <configuration>
        <workingDirectory>frontend</workingDirectory>
        <installDirectory>target</installDirectory>
    </configuration>
    <executions>
        <execution>
            <id>install node and npm</id>
            <goals>
                <goal>install-node-and-npm</goal>
            </goals>
            <configuration>
                <nodeVersion>v8.9.4</nodeVersion>
                <npmVersion>5.6.0</npmVersion>
            </configuration>
        </execution>
        <execution>
            <id>npm install</id>
            <goals>
                <goal>npm</goal>
            </goals>
            <configuration>
                <arguments>install</arguments>
            </configuration>
        </execution>
        <execution>
            <id>npm run build</id>
            <goals>
                <goal>npm</goal>
            </goals>
            <configuration>
                <arguments>run build</arguments>
            </configuration>
        </execution>
    </executions>
</plugin>
```

When you run `mvn clean install`, maven will install npm and node locally and run `npm build`
in the `frontend` directory. 

```
$ mvn clean install
[...]

[INFO] Installed node locally.
[INFO] Installing npm version 5.6.0
[INFO] Unpacking /Users/oven/.m2/repository/com/github/eirslett/npm/5.6.0/npm-5.6.0.tar.gz into /Users/oven/git/react-and-spring/target/node/node_modules
[INFO] Installed npm locally.
[INFO]
[INFO] --- frontend-maven-plugin:1.6:npm (npm install) @ spring-and-react ---
[INFO] Running 'npm install' in /Users/oven/git/react-and-spring/frontend
[WARNING] npm WARN ajv-keywords@3.1.0 requires a peer of ajv@^6.0.0 but none is installed. You must install peer dependencies yourself.
[ERROR]
[INFO] up to date in 7.23s
[INFO]
[INFO] --- frontend-maven-plugin:1.6:npm (npm run build) @ spring-and-react ---
[INFO] Running 'npm run build' in /Users/oven/git/react-and-spring/frontend
[INFO]
[INFO] > frontend@0.1.0 build /Users/oven/git/react-and-spring/frontend
[INFO] > react-scripts build
[INFO]
[INFO] Creating an optimized production build...
[INFO] Compiled successfully.
[...]
```

This results in a production build of the frontend in `frontend/build`: 

```
$ tree frontend/build
frontend/build
├── asset-manifest.json
├── favicon.ico
├── index.html
├── manifest.json
├── service-worker.js
└── static
    ├── css
    │   ├── main.c17080f1.css
    │   └── main.c17080f1.css.map
    ├── js
    │   ├── main.9980f700.js
    │   └── main.9980f700.js.map
    └── media
        └── logo.5d5d9eef.svg

4 directories, 10 files
```

### Include frontend build files in spring boot jar
We now have to copy these files to `target/classes/public` in order to serve them as static resources
from the Spring Boot application. We'll use the ant plugin for this. 

Add the following to `pom.xml` under `/build/plugins`: 

```xml
 <plugin>
    <artifactId>maven-antrun-plugin</artifactId>
    <executions>
        <execution>
            <phase>generate-resources</phase>
            <configuration>
                <target>
                    <copy todir="${project.build.directory}/classes/public">
                        <fileset dir="${project.basedir}/frontend/build"/>
                    </copy>
                </target>
            </configuration>
            <goals>
                <goal>run</goal>
            </goals>
        </execution>
    </executions>
</plugin>
``` 

This will ensure that the frontend build files are copied after they have been generated by `npm build`.

Run maven again, and inspect the contents of the `target/classes` directory: 

```
$ mvn clean install
[...]

[INFO] --- maven-antrun-plugin:1.8:run (default) @ spring-and-react ---
[INFO] Executing tasks

main:
     [copy] Copying 10 files to /Users/oven/git/react-and-spring/target/classes/public
[INFO] Executed tasks

[...] 

$ tree target/classes
  target/classes
  ├── application.properties
  ├── icl
  │   └── rus
  │       └── spring
  │           ├── HelloController.class
  │           └── SpringAndReactApplication.class
  └── public
      ├── asset-manifest.json
      ├── favicon.ico
      ├── index.html
      ├── manifest.json
      ├── service-worker.js
      └── static
          ├── css
          │   ├── main.c17080f1.css
          │   └── main.c17080f1.css.map
          ├── js
          │   ├── main.9980f700.js
          │   └── main.9980f700.js.map
          └── media
              └── logo.5d5d9eef.svg
  
  8 directories, 13 files
```

You should also check that the files are present in the resulting jar file: 

```  
$ jar tvf target/spring-and-react-0.0.1-SNAPSHOT.jar | grep public
     0 Wed Apr 11 11:50:14 CEST 2018 BOOT-INF/classes/public/
     0 Wed Apr 11 11:50:14 CEST 2018 BOOT-INF/classes/public/static/
     0 Wed Apr 11 11:50:14 CEST 2018 BOOT-INF/classes/public/static/css/
     0 Wed Apr 11 11:50:14 CEST 2018 BOOT-INF/classes/public/static/js/
     0 Wed Apr 11 11:50:14 CEST 2018 BOOT-INF/classes/public/static/media/
494612 Wed Apr 11 11:50:14 CEST 2018 BOOT-INF/classes/public/static/js/main.9980f700.js.map
  3235 Wed Apr 11 11:50:14 CEST 2018 BOOT-INF/classes/public/service-worker.js
123322 Wed Apr 11 11:50:14 CEST 2018 BOOT-INF/classes/public/static/js/main.9980f700.js
   650 Wed Apr 11 11:50:14 CEST 2018 BOOT-INF/classes/public/static/css/main.c17080f1.css
  2671 Wed Apr 11 11:50:14 CEST 2018 BOOT-INF/classes/public/static/media/logo.5d5d9eef.svg
  1288 Wed Apr 11 11:50:14 CEST 2018 BOOT-INF/classes/public/static/css/main.c17080f1.css.map
  3870 Wed Apr 11 11:50:14 CEST 2018 BOOT-INF/classes/public/favicon.ico
   257 Wed Apr 11 11:50:14 CEST 2018 BOOT-INF/classes/public/asset-manifest.json
   548 Wed Apr 11 11:50:14 CEST 2018 BOOT-INF/classes/public/index.html
   317 Wed Apr 11 11:50:14 CEST 2018 BOOT-INF/classes/public/manifest.json
```

Now, we're ready to start the application. Make sure you quit any running servers, and run the
jar file 

```
$ java -jar target/spring-and-react-0.0.1-SNAPSHOT.jar


  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.0.1.RELEASE)

2018-04-11 11:53:44.983  INFO 93434 --- [           main] n.k.s.SpringAndReactApplication          : Starting SpringAndReactApplication v0.0.1-SNAPSHOT on oven.local with PID 93434 (/Users/oven/git/react-and-spring/target/spring-and-react-0.0.1-SNAPSHOT.jar started by oven in /Users/oven/git/react-and-spring)
2018-04-11 11:53:44.986  INFO 93434 --- [           main] n.k.s.SpringAndReactApplication          : No active profile set, falling back to default profiles: default
2018-04-11 11:53:45.045  INFO 93434 --- [           main] ConfigServletWebServerApplicationContext : Refreshing org.springframework.boot.web.servlet.context.AnnotationConfigServletWebServerApplicationContext@5af3afd9: startup date [Wed Apr 11 11:53:45 CEST 2018]; root of context hierarchy
2018-04-11 11:53:46.180  INFO 93434 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8080 (http)
2018-04-11 11:53:46.221  INFO 93434 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2018-04-11 11:53:46.222  INFO 93434 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet Engine: Apache Tomcat/8.5.29
[...]
2018-04-11 11:53:47.039  INFO 93434 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
[...]
```

Open your web browser, and navigate to http://localhost:8080.

name := """backend"""

version := "1.0-SNAPSHOT"

scalaVersion := "2.13.13"

lazy val root = (project in file("."))
  .enablePlugins(PlayScala)
  .settings(
    name := """scala""",
    libraryDependencies ++= Seq(
      guice,
      "org.scalatestplus.play" %% "scalatestplus-play" % "7.0.1" % Test,

      // Slick for database interaction
      "com.typesafe.play" %% "play-slick" % "5.3.0",
      "com.typesafe.slick" %% "slick-hikaricp" % "3.5.1",
      "com.typesafe.slick" %% "slick-codegen" % "3.5.1",

      // Databases
      // Postgresql driver
      "org.postgresql" % "postgresql" % "42.7.3",
      // Mongodb driver
      "org.mongodb.scala" %% "mongo-scala-driver" % "5.0.1",
      // --

      // JSON parser
      "io.circe" %% "circe-core" % "0.14.6",
      "io.circe" %% "circe-generic" % "0.14.6",
      "io.circe" %% "circe-parser" % "0.14.6",

      // Password encryption in database
      "org.mindrot" % "jbcrypt" % "0.4",

      // Token generator for authentication
      "com.pauldijou" %% "jwt-play" % "5.0.0",

      // Encryption library for safe data transfer
      "org.bouncycastle" % "bcpkix-jdk15on" % "1.70",
    )
  )

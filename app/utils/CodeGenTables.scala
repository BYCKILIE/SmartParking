package utils

object CodeGenTables extends App {
  slick.codegen.SourceCodeGenerator.run(
    "slick.jdbc.PostgresProfile",
    "org.postgresql.Driver",
    "jdbc:postgresql://localhost:5432/smart_parking?user=postgres&password=Sarmale2505",
    "C:\\Projects\\SmartParking\\backend\\app",
    "models", None, None, ignoreInvalidDefaults = true, outputToMultipleFiles = true
  )
}

package models
// AUTO-GENERATED Slick data model for table Credentials
trait CredentialsTable {

  self:TablesRoot with UsersTable  =>

  import profile.api._
  import slick.model.ForeignKeyAction
  // NOTE: GetResult mappers for plain SQL are only generated
  // for tables where Slick knows how to map the types of all columns.
  import slick.jdbc.{GetResult => GR}
  /** Entity class storing rows of table Credentials
   *  @param email Database column email SqlType(varchar), Length(100,true)
   *  @param password Database column password SqlType(varchar), Length(100,true)
   *  @param userId Database column user_id SqlType(int8) */
  case class CredentialsRow(email: String, password: String, userId: Long)
  /** GetResult implicit for fetching CredentialsRow objects using plain SQL queries */
  implicit def GetResultCredentialsRow(implicit e0: GR[String], e1: GR[Long]): GR[CredentialsRow] = GR{
    prs => import prs._
    (CredentialsRow.apply _).tupled((<<[String], <<[String], <<[Long]))
  }
  /** Table description of table credentials. Objects of this class serve as prototypes for rows in queries. */
  class Credentials(_tableTag: Tag) extends profile.api.Table[CredentialsRow](_tableTag, "credentials") {
    def * = ((email, password, userId)).mapTo[CredentialsRow]
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(email), Rep.Some(password), Rep.Some(userId))).shaped.<>({r=>import r._; _1.map(_=> (CredentialsRow.apply _).tupled((_1.get, _2.get, _3.get)))}, (_:Any) => throw new Exception("Inserting into ? projection not supported."))

    /** Database column email SqlType(varchar), Length(100,true) */
    val email: Rep[String] = column[String]("email", O.Length(100,varying=true))
    /** Database column password SqlType(varchar), Length(100,true) */
    val password: Rep[String] = column[String]("password", O.Length(100,varying=true))
    /** Database column user_id SqlType(int8) */
    val userId: Rep[Long] = column[Long]("user_id")

    /** Foreign key referencing Users (database name credentials_user_id_fkey) */
    lazy val usersFk = foreignKey("credentials_user_id_fkey", userId, Users)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)

    /** Uniqueness Index over (email) (database name credentials_email_key) */
    val index1 = index("credentials_email_key", email, unique=true)
  }
  /** Collection-like TableQuery object for table Credentials */
  lazy val Credentials = new TableQuery(tag => new Credentials(tag))
}

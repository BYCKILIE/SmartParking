package models
// AUTO-GENERATED Slick data model for table Users
trait UsersTable {

  self:TablesRoot  =>

  import profile.api._
  import slick.model.ForeignKeyAction
  // NOTE: GetResult mappers for plain SQL are only generated
  // for tables where Slick knows how to map the types of all columns.
  import slick.jdbc.{GetResult => GR}
  /** Entity class storing rows of table Users
   *  @param id Database column id SqlType(bigserial), AutoInc, PrimaryKey
   *  @param firstName Database column first_name SqlType(varchar), Length(100,true)
   *  @param lastName Database column last_name SqlType(varchar), Length(70,true) */
  case class UsersRow(id: Long, firstName: String, lastName: String)
  /** GetResult implicit for fetching UsersRow objects using plain SQL queries */
  implicit def GetResultUsersRow(implicit e0: GR[Long], e1: GR[String]): GR[UsersRow] = GR{
    prs => import prs._
    (UsersRow.apply _).tupled((<<[Long], <<[String], <<[String]))
  }
  /** Table description of table users. Objects of this class serve as prototypes for rows in queries. */
  class Users(_tableTag: Tag) extends profile.api.Table[UsersRow](_tableTag, "users") {
    def * = ((id, firstName, lastName)).mapTo[UsersRow]
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(firstName), Rep.Some(lastName))).shaped.<>({r=>import r._; _1.map(_=> (UsersRow.apply _).tupled((_1.get, _2.get, _3.get)))}, (_:Any) => throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(bigserial), AutoInc, PrimaryKey */
    val id: Rep[Long] = column[Long]("id", O.AutoInc, O.PrimaryKey)
    /** Database column first_name SqlType(varchar), Length(100,true) */
    val firstName: Rep[String] = column[String]("first_name", O.Length(100,varying=true))
    /** Database column last_name SqlType(varchar), Length(70,true) */
    val lastName: Rep[String] = column[String]("last_name", O.Length(70,varying=true))
  }
  /** Collection-like TableQuery object for table Users */
  lazy val Users = new TableQuery(tag => new Users(tag))
}

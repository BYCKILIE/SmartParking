package models
// AUTO-GENERATED Slick data model for table Cars
trait CarsTable {

  self:TablesRoot with UsersTable  =>

  import profile.api._
  import slick.model.ForeignKeyAction
  // NOTE: GetResult mappers for plain SQL are only generated
  // for tables where Slick knows how to map the types of all columns.
  import slick.jdbc.{GetResult => GR}
  /** Entity class storing rows of table Cars
   *  @param userId Database column user_id SqlType(int8)
   *  @param license Database column license SqlType(varchar), Length(15,true), Default(None) */
  case class CarsRow(userId: Long, license: Option[String] = None)
  /** GetResult implicit for fetching CarsRow objects using plain SQL queries */
  implicit def GetResultCarsRow(implicit e0: GR[Long], e1: GR[Option[String]]): GR[CarsRow] = GR{
    prs => import prs._
    (CarsRow.apply _).tupled((<<[Long], <<?[String]))
  }
  /** Table description of table cars. Objects of this class serve as prototypes for rows in queries. */
  class Cars(_tableTag: Tag) extends profile.api.Table[CarsRow](_tableTag, "cars") {
    def * = ((userId, license)).mapTo[CarsRow]
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(userId), license)).shaped.<>({r=>import r._; _1.map(_=> (CarsRow.apply _).tupled((_1.get, _2)))}, (_:Any) => throw new Exception("Inserting into ? projection not supported."))

    /** Database column user_id SqlType(int8) */
    val userId: Rep[Long] = column[Long]("user_id")
    /** Database column license SqlType(varchar), Length(15,true), Default(None) */
    val license: Rep[Option[String]] = column[Option[String]]("license", O.Length(15,varying=true), O.Default(None))

    /** Foreign key referencing Users (database name cars_user_id_fkey) */
    lazy val usersFk = foreignKey("cars_user_id_fkey", userId, Users)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table Cars */
  lazy val Cars = new TableQuery(tag => new Cars(tag))
}

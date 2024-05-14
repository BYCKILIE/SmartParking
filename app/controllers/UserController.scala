package controllers

import javax.inject.Inject
import javax.inject.Singleton

import scala.concurrent.ExecutionContext

import play.api.libs.json.Json
import play.api.mvc._
import services.BookingsService
import DTO.BookingsDTO

@Singleton
class UserController @Inject() (
    cc: ControllerComponents,
    bookingService: BookingsService
)(
    implicit ec: ExecutionContext
) extends AbstractController(cc) {

  def createUser(): Action[AnyContent] = Action.async { implicit request =>
    bookingService
      .createBooking(BookingsDTO.decode(request.body.asJson.get.toString()))
      .map { success =>
        if (success) {
          Ok(Json.obj("message" -> s"User created successfully at $success id"))
        } else {
          InternalServerError(Json.obj("message" -> "Failed to create user"))
        }
      }
      .recover {
        case e: Exception =>
          InternalServerError(Json.obj("message" -> s"An error occurred: ${e.getMessage}"))
      }
  }

  def deleteUser(): Action[AnyContent] = Action.async { implicit request =>
    bookingService
      .deleteBooking(BookingsDTO.decode(request.body.asJson.get.toString()))
      .map { success =>
        if (success) {
          Ok("muie")
        } else {
          InternalServerError("iar muie")
        }
      }
  }

//  def getUserByEmail(email: String) = Action.async { _ =>
//    println(email)
//    userService.findUserByEmail(email).map {
//      case Some(user) => Ok(JsonOP.serialize[User](user))
//      case None => NotFound("User not found")
//    }
//  }

}

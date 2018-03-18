import { JsonController, Get, Param, Put, Body, NotFoundError, Post } from 'routing-controllers'
import User from './entity'

// type PageList = { pages: Page[] }

@JsonController()
export default class UserController {

    @Get('/users')
    async allUsers() {
      const users = await User.find()
      return { users }
    }

    @Get('/users/:id')
    getUser(
      @Param('id') id: number
    ) {
      return User.findOneById(id)
    }

    @Put('/pages/:id')
    async updateUser(
      @Param('id') id: number,
      @Body() update: Partial<User>
    ) {
      const user = await User.findOneById(id)
      if (!user) throw new NotFoundError('Cannot find user')

      return User.merge(user, update).save()
    }

    @Post('/users')
    async createUser(
      @Body() user: User
    ) {
      const {password, ...rest} = user
      const entity = User.create(rest)
      await entity.setPassword(password)
      return entity.save()
    }
}

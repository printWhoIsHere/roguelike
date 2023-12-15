import settings from '../settings/settings.js'
import { Hero } from './player.js'
import { Enemy } from './enemy.js'

class Map {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.tiles = this.genearteMap(width, height)
    this.entities = []
    this.imgWall = new Image()
    this.imgWall.src = 'images/wall.png'
  }

  genearteMap(width, height) {
    const map = []

    // Создаем пустую карту
    for (let y = 0; y < height; y++) {
      map[y] = []
      for (let x = 0; x < width; x++) {
        map[y][x] = 'wall'
      }
    }

    const rooms = []
    const { numRooms, minRoomSize, maxRoomSize } = settings.map

    // Генерируем комнаты
    for (let i = 0; i < numRooms; i++) {
      const roomWidth =
        Math.floor(Math.random() * (maxRoomSize - minRoomSize + 1)) +
        minRoomSize
      const roomHeight =
        Math.floor(Math.random() * (maxRoomSize - minRoomSize + 1)) +
        minRoomSize

      const x = Math.floor(Math.random() * (width - roomWidth - 1)) + 1
      const y = Math.floor(Math.random() * (height - roomHeight - 1)) + 1

      // Создаем комнату
      for (let roomY = 0; roomY < roomHeight; roomY++) {
        for (let roomX = 0; roomX < roomWidth; roomX++) {
          map[y + roomY][x + roomX] = 'floor'
        }
      }

      rooms.push({ x, y, width: roomWidth, height: roomHeight })
    }

    // Создаем проходы между комнатами
    for (let i = 0; i < rooms.length - 1; i++) {
      const roomA = rooms[i]
      const roomB = rooms[i + 1]

      const pointA = {
        x: Math.floor(Math.random() * roomA.width) + roomA.x,
        y: Math.floor(Math.random() * roomA.height) + roomA.y,
      }

      const pointB = {
        x: Math.floor(Math.random() * roomB.width) + roomB.x,
        y: Math.floor(Math.random() * roomB.height) + roomB.y,
      }

      // Соединяем комнаты проходом
      while (pointA.x !== pointB.x || pointA.y !== pointB.y) {
        if (pointA.x !== pointB.x) {
          if (pointA.x < pointB.x) pointA.x++
          else pointA.x--
        } else if (pointA.y !== pointB.y) {
          if (pointA.y < pointB.y) pointA.y++
          else pointA.y--
        }

        if (map[pointA.y][pointA.x] !== 'floor') {
          map[pointA.y][pointA.x] = 'floor'
        }
      }
    }

    return map
  }

  addEntity(entity) {
    this.entities.push(entity) // Метод для добавления объектов на карту
  }

  drawEntities(ctx, tileSize) {
    this.entities.forEach((entity) => {
      if (entity instanceof Hero) {
        entity.drawPlayer(ctx, tileSize)
      } else if (entity instanceof Enemy) {
        entity.drawEnemy(ctx, tileSize)
      }
      // Добавьте сюда другие типы объектов, если они будут
    })
  }

  // Изменяем метод drawMap
  drawMap(ctx, tileSize) {
    const self = this
    const imgFloor = new Image()
    imgFloor.src = 'images/floor.png'

    imgFloor.onload = () => {
      for (let y = 0; y < self.height; y++) {
        for (let x = 0; x < self.width; x++) {
          if (self.tiles[y][x] === 'wall') {
            ctx.drawImage(
              self.imgWall,
              x * tileSize,
              y * tileSize,
              tileSize * 4,
              tileSize * 4
            )
          } else if (self.tiles[y][x] === 'floor') {
            ctx.drawImage(
              imgFloor,
              x * tileSize,
              y * tileSize,
              tileSize,
              tileSize
            )

            // Добавляем обводку вокруг изображения пола
            ctx.strokeStyle = '#000' // Цвет обводки
            ctx.lineWidth = 0.2
            ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize)
          }
        }
      }
      // Отрисовываем объекты на карте после отрисовки тайлов
      this.drawEntities(ctx, tileSize)
      console.log('Карта с сущностями:', this.tiles)
    }
  }
}

export { Map }

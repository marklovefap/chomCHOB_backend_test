import  { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize(undefined)

const item = sequelize.define('Item', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sale_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    close_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    game_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

const code = sequelize.define('Code', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    create_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    game_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})


const game = sequelize.define('Game', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

const promotion = sequelize.define('Promotion', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    full_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    discount_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sale_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    close_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
})

const bundle = sequelize.define('Bundle', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number_of_item: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    full_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    discount_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sale_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    close_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
})

const item_promotion = sequelize.define('Item_Promotion', {
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    promotion_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

const item_bundle = sequelize.define('Item_Promotion', {
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bundle_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

game.hasMany(item, { foreignKey: 'game_id' })
game.hasMany(code, { foreignKey: 'game_id' })

item.hasOne(code, { foreignKey: 'item_id' })
item.hasMany(item_promotion, { foreignKey: 'item_id' })
item.hasMany(item_bundle, { foreignKey: 'item_id' })
item.belongsTo(game, { foreignKey: 'game_id' })

code.belongsTo(game, { foreignKey: 'game_id' })
code.belongsTo(item, { foreignKey: 'item_id' })

promotion.hasMany(item_promotion, { foreignKey: 'promotion_id' })

bundle.hasMany(item_bundle, { foreignKey: 'bundle_id' })

item_promotion.belongsTo(item, { foreignKey: 'item_id' })
item_promotion.belongsTo(promotion, { foreignKey: 'promotion_id' })

item_bundle.belongsTo(item, { foreignKey: 'item_id' })
item_bundle.belongsTo(bundle, { foreignKey: 'bundle_id'})




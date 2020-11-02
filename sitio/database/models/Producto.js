module.exports = (sequelize, dataTypes) => {
    let alias = "productos";
    let cols = {
        idProducto: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncremet: true
        },
        nombre: {
            type: dataTypes.STRING(100)
        },
        precio: {
            type: dataTypes.DECIMAL(10, 2)
        },
        descuento: {
            type: dataTypes.INTEGER(2)
        },
        idCategoria: {
            type: dataTypes.INTEGER(11),
            allowNull: true
        },
        idClasificacion: {
            type: dataTypes.INTEGER(11),
            allowNull: true
        },
        puntaje: {
            type: dataTypes.DECIMAL(2, 2)
        },
        stock: {
            type: dataTypes.INTEGER(11)
        },
        descripcion: {
            type: dataTypes.STRING(300)
        },
        imagen: {
            type: dataTypes.STRING(100)
        },
    };

    let config = {
        tableName: "productos",
        timestamps: false
    }

    let Producto = sequelize.define(alias, cols, config)

    Producto.associate = function(models) {

        Producto.belongsTo(models.categorias, {
            as: "categorias",
            foreignKey: "idCategoria",
        })
        Producto.belongsTo(models.clasificaciones, {
            as: "clasificaciones",
            foreignKey: "idClasificacion",
        })

        Producto.belongsToMany(models.usuarios, {
            as: 'usuarios',
            through: "carritos",
            foreignKey: "idUsuario",
            otherKey: "idProducto",
            timestamps: false
        })
    }

    return Producto

}
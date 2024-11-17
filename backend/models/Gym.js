import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import { User } from "./User.js";

// GYM
export const Gym = sequelize.define('Gym', {
    gymName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gymPhone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gymEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profileImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gymLicense: {
        type: DataTypes.STRING,
        allowNull: true
    },


    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'

        }
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false
    }





}, {
    timestamps: true
})

User.hasMany(Gym, { foreignKey: "ownerId" });
Gym.belongsTo(User, { foreignKey: "ownerId" });


// PLAN (MEMEBERSHIPS AND SUBSCRIPTION)
export const Plan = sequelize.define('Plan', {
    planName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    planDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    planType: {
        type: DataTypes.ENUM('membership', 'subscription'),
        allowNull: false

    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    version: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    gymId: {
        type: DataTypes.INTEGER,
        references: {
            model: Gym,
            key: 'id'
        },
        allowNull: true
    },
    state: {
        type: DataTypes.ENUM('active', 'inactive'),
        allowNull: false
    },
    duration: {
        type: DataTypes.STRING
    }

}, { timestamps: true })

export const GymLocation = sequelize.define('GymLocation', {
    buildingNo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false

    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    landmark: {
        type: DataTypes.STRING,
        allowNull: true

    },
    gymId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Gym,
            key: 'id'
        }
    }


}, { timestamps: true })

export const GymRule = sequelize.define('GymRule', {
    gymRule: DataTypes.STRING,
    gymId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Gym,
            key: 'id'
        }
    }
})

export const GymFeature = sequelize.define('GymFeature', {
    featureName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    featureImgPath: {
        type: DataTypes.STRING,
        allowNull: true

    }
}, {
    timestamps: true
})

export const GymFeatureMapping = sequelize.define('GymFeatureMapping', {
    gymId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Gym,
            key: 'id'
        }
    },
    gymFeatureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: GymFeature,
            key: 'id'
        }
    }
}, { timestamps: true })

export const GymWorkout = sequelize.define('GymWorkout', {
    workoutName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true })

export const GymWorkoutMapping = sequelize.define('GymWorkoutMapping', {
    gymId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Gym,
            key: 'id'
        }
    },
    gymWorkoutId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: GymWorkout,
            key: 'id'
        }
    }
})

export const GymOpeningHours = sequelize.define('GymOpeningHour', {
    gymId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Gym,
            key: 'id'
        }
    },
    morning: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    evening: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true })

export const GymImages = sequelize.define('GymImages', {
    gymId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Gym,
            key: 'id'
        }
    },
    gymImgPath: {
        type: DataTypes.STRING,
        allowNull: false,

    }
}, { timestamps: true })



export const Notification = sequelize.define('Notification', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    senderId:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Gym,
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    linkContent: {
        type: DataTypes.STRING,
        allowNull: true
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true
    },
    seen:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
    }
}, { timestamps: true })

export const Saved = sequelize.define('Saved', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    gymId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Gym,
            key: 'id'

        }
    }

}, { timestamps: true })

export const Rating = sequelize.define('Rating', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }

    },
    gymId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Gym,
            key: 'id'

        }
    },

    rating: {
        type: DataTypes.FLOAT,
        allowNull: false,

    },

    comment: {
        type: DataTypes.STRING,
        allowNull: true
    }


})

User.hasMany(Rating, { foreignKey: 'userId' })
Rating.belongsTo(User, { foreignKey: 'userId' })

Gym.hasMany(Rating, { foreignKey: 'gymId' })
Rating.belongsTo(Gym, { foreignKey: 'gymId' })

User.hasMany(Saved, { foreignKey: 'userId' })
Saved.belongsTo(User, { foreignKey: 'userId' })

Gym.hasMany(Saved, { foreignKey: 'gymId' })
Saved.belongsTo(Gym, { foreignKey: 'gymId' })

User.hasMany(Notification, { foreignKey: 'userId' })
Notification.belongsTo(User, { foreignKey: 'userId' })
Gym.hasMany(Notification, {foreignKey: 'senderId'})
Notification.belongsTo(Gym, {foreignKey: 'senderId'})

Gym.hasMany(GymImages, { foreignKey: 'gymId' })
GymImages.belongsTo(Gym, { foreignKey: 'gymId' })

Gym.hasOne(GymOpeningHours, { foreignKey: 'gymId' })
GymOpeningHours.belongsTo(Gym, { foreignKey: 'gymId' })


Gym.hasMany(GymWorkoutMapping, { foreignKey: 'gymId' })
GymWorkoutMapping.belongsTo(Gym, { foreignKey: 'gymId' })
GymWorkout.hasMany(GymWorkoutMapping, { foreignKey: 'gymWorkoutId' })
GymWorkoutMapping.belongsTo(GymWorkout, { foreignKey: 'gymWorkoutId' })


Gym.hasMany(GymFeatureMapping, { foreignKey: 'gymId' })
GymFeatureMapping.belongsTo(Gym, { foreignKey: 'gymId' })
GymFeature.hasMany(GymFeatureMapping, { foreignKey: 'gymFeatureId' })
GymFeatureMapping.belongsTo(GymFeature, { foreignKey: 'gymFeatureId' })

Gym.hasMany(GymRule, { foreignKey: 'gymId' })
GymRule.belongsTo(Gym, { foreignKey: 'gymId' })

Gym.hasOne(GymLocation, { foreignKey: 'gymId' })
GymLocation.belongsTo(Gym, { foreignKey: 'gymId' })

Gym.hasMany(Plan, { foreignKey: 'gymId' })
Plan.belongsTo(Gym, { foreignKey: 'gymId' })
import * as mongoose from 'mongoose';
export declare const GamesModel: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title: string;
    short_description: string;
    long_description: string;
    features: string;
    installs: string;
    current_version: string;
    category: string;
    banner: string;
    game_file: {
        filename: string;
        size: number;
    };
    owner_id: mongoose.Types.ObjectId;
    whats_new?: string;
}>;

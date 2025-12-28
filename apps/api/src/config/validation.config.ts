import { BadRequestException, ValidationPipeOptions } from "@nestjs/common";

/**
 * Validation configuration for the application
 *
 * @type {ValidationPipeOptions}
 */
export const validationConfig: ValidationPipeOptions = {
    /**
     * Remove any properties that are not defined in the class
     */
    whitelist: true,

    /**
     * Transform input data to match the class properties
     */
    transform: true,

    /**
     * Forbid any properties that are not defined in the class
     */
    forbidNonWhitelisted: true,

    /**
     * Custom exception factory for validation errors
     */
    exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
            field: error.property,
            errors: Object.values(error.constraints || {}),
        }));
        return new BadRequestException(result);
    },
};

<?php

namespace App\Traits;

use Ramsey\Uuid\Uuid;

trait HasUuidPrimaryKey
{
    /**
     * Boot function from Laravel.
     */
    protected static function bootHasUuidPrimaryKey()
    {
        static::creating(function ($model) {
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }
    /**
     * Get the value indicating whether the IDs are incrementing.
     *
     * @return bool
     */
    public function getIncrementing()
    {
        return false;
    }    /**
     * Get the auto-incrementing key type.
     *
     * @return string
     */
    public function getKeyType()
    {
        return 'string';
    }
}
